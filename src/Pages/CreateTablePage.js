import { Layout, Button, Row, Col } from "antd";
import { DatePicker, Form, Input, ConfigProvider } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState, memo } from "react";
import SelectUserModel from "../components/SelectUserModel";
import toast from "react-hot-toast";
import week from "../service/week"
import moment from 'moment';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import trTR from "antd/lib/locale/tr_TR";
import 'dayjs/locale/tr';

function CreateTablePage({ setSelectWeek, setUpdateSider }) {

    const [disabledButton,setDisabledButton] = useState(false)
    const { Header, Content } = Layout;
    const [dateString, setDateString] = useState(null);
    const [form] = useForm();
    const [selectedUserOptions, setSelectedUserOptions] = useState([])
    const navigate = useNavigate();
    const createTable = (formValue) => {
        setDisabledButton(true);
        formValue.weekName = formValue.weekName.trim();
        formValue["users"] = selectedUserOptions;
        const [startDateofWeek, endDateOfWeek] = dateString.replace(" ~ ", "-").split("-")
        const startOfWeek = moment(startDateofWeek, 'YYYY-MM-DD')
        const endOfWeek = moment(endDateOfWeek, 'YYYY-MM-DD')
        const datesOfWeek = [];
        for (let current = startOfWeek.clone(); current.isSameOrBefore(endOfWeek); current.add(1, 'day')) {
            datesOfWeek.push(current.format('YYYY/MM/DD'));
        }

        const weekData = {
            weekName: formValue.weekName.trim(),
            daysOfWeek: datesOfWeek,
            users: selectedUserOptions
        }
        week.addWeek(weekData)
            .then(ress => ress.data)
            .then(ressData => {
                switch (ressData.responseType) {
                    case "SUCCESS":
                        navigate(`/homePage/weekTable?key=${weekData.weekName}`)
                        setUpdateSider(prevState => !prevState)
                        Toast(ressData.responseMessage,"success",1500)
                        break
                    case "ERROR":
                        setDisabledButton(false);
                        Toast(ressData.responseMessage,"error",1500)
                        break
                }
            }).catch(e => {
                setDisabledButton(false);
                Toast(e.message,"error",1500)
            })

    };

    function submitForm() {
        form
            .validateFields()
            .then((formValue) => {
                createTable(formValue)
            })
            .catch((e) => Toast("Lütfen zorunlu alanları doldurun", "error", 2000))

    }
    return (
        <Layout>
            <Header
                className="bg-white p-0 drop-shadow-md"
                style={{
                    backgroundColor: "white"
                }}
            >
                <div className="font-bold font-mono uppercase text-2xl tracking-widest py-4 text-center">
                    Tablo Oluşturma
                </div>
                <hr></hr>
            </Header>
            <Content className="mx-3 mt-2 p-3">
                <hr className="my-2"></hr>

                <div className="items-center">
                    <FormModel
                        selectedUserOptions={selectedUserOptions}
                        setSelectedUserOptions={setSelectedUserOptions}
                        submitForm={submitForm}
                        form={form}
                        setDateString={setDateString}
                        disabledButton={disabledButton}
                    />
                </div>
            </Content>
        </Layout>
    )
}

function FormModel({ selectedUserOptions, setSelectedUserOptions, submitForm, form, setDateString , disabledButton }) {
    function convertDateString(date) {
        let newDate = date.split("/")
        newDate = newDate.reverse();
        newDate = newDate.join("/")
        return newDate
    }

    const onChangeDatePicker = (date, dateString) => {
        setDateString(dateString)
        form.setFieldsValue({
            weekName: convertDateString(dateString.split(" - ")[0])
        })
    }

    const customWeekStartEndFormat = (value) => {
        const startDate = dayjs(value).startOf('week').add(1, 'day');
        const endDate = dayjs(value).endOf('week').add(1, 'day');

        return `${startDate.format('YYYY/MM/DD')} - ${endDate.format('YYYY/MM/DD')}`;
    };

    return (
        <>
            <div className="container flex justify-center" >
                <Col className="sm:w-10/12 md:w-6/12 lg:w-3/5 w-2/5  login-form-bg-image container mt-5 py-4 border-2 border-slate-200 rounded-xl drop-shadow-xl" >
                    <Row>
                        <Form
                            className="w-11/12 px-3 py-1"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            layout="horizontal"
                            initialValues={{
                                size: "small",
                                remember: false,
                            }}
                            form={form}
                            onFinish={submitForm}
                            autoComplete="off"
                        >
                            <Form.Item
                                placeholder="Tablo İsmi"
                                name="weekName"
                                className="my-2"
                                label="Table Name:"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tablo ismini giriniz!",
                                    },
                                ]}
                            >
                                <Input
                                    className="ml-1"
                                />
                            </Form.Item>
                            <ConfigProvider locale={trTR} >
                                <Form.Item
                                    name="weekOfYear"
                                    className="my-1"
                                    label="Select Week: "
                                    rules={[
                                        {
                                            required: true,
                                            message: "Lütfen bir tarih seçiniz!",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        format={customWeekStartEndFormat}
                                        className="ml-1"
                                        picker="week"
                                        placeholder="Hafta Seç"
                                        onChange={onChangeDatePicker}
                                    />
                                </Form.Item>
                            </ConfigProvider>
                            <Form.Item
                                label="Kişi Seç: "
                                className="my-2 ml-1"
                            >
                                <SelectUserModel
                                    selectedUserOptions={selectedUserOptions}
                                    setSelectedUserOptions={setSelectedUserOptions}
                                />
                            </Form.Item>
                        </Form>
                    </Row>
                    <Row
                        className="flex justify-center mt-4"
                    >
                        <Button
                            type=""
                            className='text-center w-1/5 font-bold bg-blue-500 border-gray-400 border-1 text-white drop-shadow-md hover:bg-white hover:border-gray-200 hover:text-blue-500'
                            onClick={submitForm}
                            disabled={disabledButton}
                        >
                            Oluştur
                        </Button>
                    </Row>
                </Col>
            </div>
        </>
    );
}



export default memo(CreateTablePage);