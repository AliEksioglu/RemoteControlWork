import { useEffect, useState, memo } from "react";
import { useForm } from "antd/es/form/Form";
import SelectUserModel from '../SelectUserModel'
import { Modal, Input, Form } from "antd";
import { toast } from "react-hot-toast";
import week from "../../service/week"
import Toast from "../Toast";
function TableSettingsModal({ openState, setOpenState, setSelectWeek, selectWeek, setUpdateSider , setSelectedWeekData}) {

    const [disabledOkButton, setDisabledOkButton] = useState(false);
    const [dbWeekData, setDBWeekData] = useState(null)

    function submitForm() {
        setDisabledOkButton(true);
        form.validateFields().then((formValue) => {
            if (formValue.weekName !== selectWeek.currentSelectedKey) {
                week.getWeekByName(formValue.weekName)
                    .then(ress => ress.data)
                    .then(data => {
                        switch (data.responseType) {
                            case "SUCCESS":
                                Toast("Tablo ismi zaten kullanılıyor","error",1500)
                                setDisabledOkButton(false);
                                break
                            case "ERROR":
                                weekDataSet(formValue.weekName);
                                break
                        }
                    })
            } else {
                weekDataSet(formValue.weekName);
            }

        });
    }
    const [form] = useForm();
    const [selectedUserOptions, setSelectedUserOptions] = useState([])
    const weekDataSet = (newWeekName) => {
        const newWeekData = {}
        let oldWeekName = selectWeek.currentSelectedKey;
        newWeekData.users = selectedUserOptions
        newWeekData.weekName = newWeekName;
        newWeekData.daysOfWeek = dbWeekData.daysOfWeek
        setSelectWeek({
            currentSelectedKey: newWeekName,
            lastSelectedKey: selectWeek.lastSelectedKey
        })
        week.updateWeekData(newWeekData, oldWeekName)
            .then(ress => ress.data)
            .then(data => {
                switch (data.responseType) {
                    case "SUCCESS":
                        setSelectedWeekData({
                            weekName: data.responseData.weekName,
                            daysOfWeek: data.responseData.daysOfWeek,
                            userDays: data.responseData.userDays
                        })
                        setUpdateSider(prevState => !prevState)
                        setOpenState(false)
                        Toast(data.responseMessage,"success",1500)
                        break
                    case "ERROR":
                        setDisabledOkButton(false);
                        Toast(data.responseMessage,"error",1500)
                        break
                }
            })
    }
    useEffect(() => {
        if (openState) {
            week.getWeekByName(selectWeek.currentSelectedKey)
                .then(ress => ress.data)
                .then(data => {
                    switch (data.responseType) {
                        case "SUCCESS":
                            setDisabledOkButton(false);
                            setSelectedUserOptions(Object.keys(data.responseData.userDays))
                            form.setFieldsValue({
                                weekName: selectWeek.currentSelectedKey
                            })
                            setDBWeekData({
                                ...data.responseData
                            })
                            break
                        case "ERROR":
                            Toast(data.responseMessage,"error",1500)
                            break
                    }
                }).catch(e => {
                    Toast(e.message,"error",1500)
                })
        } else {
            setDBWeekData(null)
        }

    }, [openState])

    return dbWeekData != null && (
        <Modal
            okText="Kaydet"
            cancelText="İptal"
            className="modal-title text-center"
            title="Tablo Ayarları"
            centered
            open={openState}
            onOk={() => submitForm()}
            okButtonProps={{
                className: "bg-green-500",
                disabled: disabledOkButton,
            }}
            cancelButtonProps={{
                className: "bg-red-500",
                type: "primary"
            }}

            onCancel={() => setOpenState(false)}
        >
            <hr className="my-2"></hr>
            <div className="items-center">
                <h1 className="mb-1 font-bold" >Tablo Adı</h1>
                <Form
                    autoComplete="off"
                    form={form}
                    onFinish={submitForm}
                >
                    <Form.Item
                        name="weekName"
                        rules={[
                            {
                                required: true,
                                min: 1,
                                message: "Please input weekName !"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            placeholder={selectWeek.currentSelectedKey}
                        />
                    </Form.Item>
                    <hr className="my-2"></hr>
                    <h1 className="mb-1 font-bold" >Kişiler</h1>
                    <Form.Item>
                        <SelectUserModel
                            selectedUserOptions={selectedUserOptions}
                            setSelectedUserOptions={setSelectedUserOptions}
                        />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}

export default memo(TableSettingsModal)