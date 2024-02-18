import React, { useCallback, useMemo, useState } from 'react'
import { getButtonOptionValues, getDataTypeColor, getDataTypeState } from '../others/enums'
import { Dropdown, Button } from 'antd';
import { Tooltip } from 'antd';

function WorkingTypeSelectButton({ dayData, username, colID, handleWorkingType }) {

    const isUser = username === localStorage.getItem("username");
    const [selectedKey, setSelectedKey] = useState(dayData.workingType);
    function changeButonType(key) {
        if (selectedKey !== key) {
            setSelectedKey(key)
            handleWorkingType({
                dayName: colID,
                username: username,
                changeWorkingType: key
            })
        }
    }

    const dropDownClassName = () => {
        return isUser
            ? (getDataTypeColor(selectedKey) +
                ' w-full p-1 border-none rounded-none font-bold')
            : (getDataTypeColor(selectedKey) +
                ' w-full p-1 border-none rounded-none')
    }
    const dropdownMenu = useCallback(
        <Dropdown
            menu={{
                className: 'text-center ',
                items: getButtonOptionValues(),
                selectable: true,
                selectedKeys: [selectedKey],
                onClick: ({ key }) => { changeButonType(key) }
            }}
            placement="top"

        >
            <Button className={dropDownClassName()}>
                {getDataTypeState(selectedKey)}
            </Button>
        </Dropdown>
        ,[selectedKey])

    return (isUser ||
        localStorage.getItem("isAdmin") === "true") &&
        selectedKey !== "HOLIDAY"
        ? (dropdownMenu) : (
            <center>
                <Tooltip
                    placement="top"
                    title={dayData.description}
                >
                    <div className={getDataTypeColor(selectedKey) + " rounded-none py-1 w-full"}>
                        {getDataTypeState(selectedKey)}
                    </div>
                </Tooltip>
            </center>
        )
}
export default WorkingTypeSelectButton
