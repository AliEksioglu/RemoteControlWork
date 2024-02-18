import { Select } from "antd";
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import user from "../service/user"
import Toast from "./Toast";
function SelectUserModel({ selectedUserOptions, setSelectedUserOptions }) {

    const [userOptions, setUserOptions] = useState(false)
    useEffect(() => {
        user.getUserList()
            .then(ress => ress.data)
            .then(data => {
                const options = data.responseData.map(item => ({
                    label: item.username,
                    value: item.username,
                }))
                setUserOptions(options)
            }).catch(e => {
                Toast(e.message,"error",1500)
            })
    }, [])

    const handleChange = (selectedKeys) => {
        setSelectedUserOptions(selectedKeys)
    }

    return (
        <>
            <Select
                className="w-fill"
                mode="multiple"
                placeholder="Kişi Seç"
                value={selectedUserOptions}
                onChange={handleChange}
                options={userOptions}
            />
        </>
    )

}

export default SelectUserModel
