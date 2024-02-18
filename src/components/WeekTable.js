import React, { useEffect, useState, memo } from "react";
import { Button, Row, Table } from "antd";
import WorkingTypeSelectButton from "./WorkingTypeSelectButton";
import { UserOutlined, DeleteOutlined, DeleteFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import week from "../service/week"
import PopUp from "./popConfirm/PopUp";
import TableSettingsModal from "./modals/TableSettingsModal";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
const WeekTable = ({ selectWeek, setSelectWeek, setUpdateSider }) => {

  const [selectedWeekData, setSelectedWeekData] = useState(null)
  const [mtableSettingState, setMTableSettingsState] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    selectWeek != null ? getWeekData(selectWeek.currentSelectedKey) : setSelectedWeekData(null)
  }, [selectWeek])

  const getWeekData = (key) => {
    if (key != null) {
      week.getWeekByName(key)
        .then(ress => ress.data)
        .then(data => {
          switch (data.responseType) {
            case "SUCCESS":
              setSelectedWeekData({
                weekName: data.responseData.weekName,
                daysOfWeek: data.responseData.daysOfWeek,
                userDays: data.responseData.userDays
              })
              break
            case "ERROR":
              Toast(data.responseMessage, "error", 1500)
              break
          }
        }).catch(e => {
          Toast(e.message, "error", 2000)
        })
    } else {
      setSelectedWeekData(null)
    }
  }

  const handleWorkingType = ({ dayName, changeWorkingType, username }) => {

    const userUpdateData = {
      weekName: selectedWeekData.weekName,
      username: username,
      dayName: dayName,
      workingType: changeWorkingType
    }
    week.updateWeekUserData(userUpdateData)
      .then(ress => ress.data)
      .then(data => {
        switch (data.responseType) {
          case "SUCCESS":
            console.log("güncellendi")
            Toast(data.responseMessage, "success", 2000)
            setSelectedWeekData({
              weekName: data.responseData.weekName,
              daysOfWeek: data.responseData.daysOfWeek,
              userDays: data.responseData.userDays
            })
            break;
          case "ERROR":
            Toast(data.responseMessage, "error", 2000)
            break;
        }
      }).catch(e => {
        Toast(e.message, "error", 2000)
      })
  }
  const userSettings = () => {
    setMTableSettingsState(true)
  }

  const deleteTable = () => {
    week.deleteWeekData(selectedWeekData.weekName)
      .then(ress => ress.data)
      .then(data => {
        switch (data.responseType) {
          case "SUCCESS":
            setSelectedWeekData(null);
            setSelectWeek(null)
            navigate('/homePage')
            setUpdateSider(prevState => !prevState);
            Toast(data.responseMessage, "success", 1000)
            break;
          case "ERROR":
            Toast(data.responseMessage, "error", 1500)
            break;
        }
      })
  }

  const COLUMS = [
    {
      title: "Kullanıcı",
      dataIndex: "name",
      key: 0,
      align: "center",
      width: "8%",
      render: (key) => (
        <h1 className="flex justify-center">
          {key}
        </h1>
      )
    },
    {
      title: "Pazartesi",
      dataIndex: "MONDAY",
      key: 1,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"MONDAY"} handleWorkingType={handleWorkingType} />
    },
    {
      title: "Salı",
      dataIndex: "TUESDAY",
      key: 2,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"TUESDAY"} handleWorkingType={handleWorkingType} />
    },
    {
      title: "Çarşamba",
      dataIndex: "WEDNESDAY",
      key: 3,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"WEDNESDAY"} handleWorkingType={handleWorkingType} />,
    },
    {
      title: "Perşembe",
      dataIndex: "THURSDAY",
      key: 4,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"THURSDAY"} handleWorkingType={handleWorkingType} />,
    },
    {
      title: "Cuma",
      dataIndex: "FRIDAY",
      key: 5,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"FRIDAY"} handleWorkingType={handleWorkingType} />,
    },
    {
      title: "Cumartesi",
      dataIndex: "SATURDAY",
      key: 6,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"SATURDAY"} handleWorkingType={handleWorkingType} />
    },
    {
      title: "Pazar",
      dataIndex: "SUNDAY",
      key: 7,
      align: "center",
      render: (key, rowData) => <WorkingTypeSelectButton dayData={key} username={rowData.name}
        colID={"SUNDAY"} handleWorkingType={handleWorkingType} />
    },
  ];

  function convertDateString(date) {
    let newDate = date.split("/")
    newDate = newDate.reverse();
    newDate = newDate.join("/")
    return newDate
  }

  const [iconState, setIconState] = useState(false);

  if (selectedWeekData != null) {
    return (
      <div style={{ padding: "20px" }}>
        <TableSettingsModal setSelectWeek={setSelectWeek} openState={mtableSettingState} setOpenState={setMTableSettingsState} selectWeek={selectWeek} setUpdateSider={setUpdateSider} setSelectedWeekData={setSelectedWeekData} />
        <Row
          className="mb-4 contents"
        >
          <Row
            className="mt-1 mb-1 flex justify-between"
          >
            <h1 className="my-2 "> <b> {selectedWeekData.weekName + " "} : {convertDateString(selectedWeekData.daysOfWeek[0])} - {convertDateString(selectedWeekData.daysOfWeek[selectedWeekData.daysOfWeek.length - 1])} </b> </h1>
            {localStorage.getItem("isAdmin") === "true" &&
              <div className="flex justify-between w-40 ml-2">
                <Button
                  type=""
                  className='font-bold border-gray-400 border-1 text-black drop-shadow-md hover:bg-blue-400 hover:border-gray-200 hover:text-white'
                  onClick={userSettings}
                >
                  Ayarlar
                </Button>
                <PopUp
                  title={`Tablo: ${selectedWeekData.weekName}`}
                  type="warning"
                  description="Bu Tabloyu silmek istediğinize emin misiniz ?"
                  onConfirm={deleteTable}
                >
                  <Button
                    type=""
                    className="font-bold border-gray-400 border-1 drop-shadow-md hover:bg-red-500 hover:border-gray-200 hover:text-white"
                    onMouseEnter={() => setIconState(true)}
                    onMouseLeave={() => setIconState(false)}
                  >
                    <div className="flex items-center" >
                      {iconState ? <DeleteFilled className="mr-2" /> : <DeleteOutlined className="mr-2 items-center " />} Sil
                    </div>
                  </Button>
                </PopUp>
              </div>
            }
          </Row>
          <Row>
            <hr style={{
              width: "100%",
              border: "1px solid gray",
              borderRadius: "15%",
              marginBottom: "10px"
            }} />
          </Row>
        </Row>
        <Table
          bordered
          className="week-working drop-shadow-lg "
          rowKey={(rowData) => `${selectedWeekData.weekName}-${rowData.name}`}
          rowClassName={(rowData) => {
            return rowData.name !== localStorage.getItem("username")
              ? localStorage.getItem("isAdmin") === "true" ? "bg-sky-100 " : 'bg-white '
              : 'bg-sky-200 font-bold'
          }}
          dataSource={TableDataConvert(selectedWeekData.userDays)}
          columns={COLUMS}
          pagination={false}
        />

      </div>
    );
  } else {
    <div>NO DATA</div>
  }
};

function TableDataConvert(tableDataUsers) {
  let tableData = [];
  for (let data of Object.entries(tableDataUsers)) {
    let user = {};
    let [name, days] = data;
    user["name"] = name
    user.key = name;
    for (let [day, workingDay] of Object.entries(days)) {
      user[day] = workingDay;
    }
    tableData.push(user);
  }
  tableData = tableData.sort((a, b) => a.name.localeCompare(b.name))
  return tableData;
}

export default memo(WeekTable);

