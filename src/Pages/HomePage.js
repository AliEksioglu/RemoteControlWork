import React, { useState, useEffect } from "react";
import PopUp from "../components/popConfirm/PopUp";
import WeekTablePage from './WeekTablePage';
import RegisterPage from './RegisterPage';
import CreateTablePage from './CreateTablePage';
import UserSettingsPage from './UserSettingsPage';
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import {
  CarryOutOutlined,
  BarsOutlined,
  CalendarOutlined,
  TeamOutlined,
  AccountBookOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import week from '../service/week'
import auth from "../service/auth";
import Toast from "../components/Toast";
//! -----------------------------

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

function getLastPath() {
  return window.location.pathname.split("/").slice(-1)[0]
}

const items = [
  getItem("Admin", "admin", <BarsOutlined />, [
    getItem(<Link to={"createTable"}>Tablo Oluştur</Link>, "createTable", <AccountBookOutlined />),
    getItem(<Link to={"userSettings"}>Kullanıcı Ayarları</Link>, "userSettings", <TeamOutlined />),
    getItem(<Link to={"register"}>Kullanıcı Ekle</Link>, "register", <UserAddOutlined />)
  ]),
]

function HomePage() {

  const user = {
    name: localStorage.getItem("name"),
    isAdmin: localStorage.getItem("isAdmin") == 'true',
  };

  const [selectWeek, setSelectWeek] = useState(null)
  const [updateSider, setUpdateSider] = useState(false)
  const [siderItems, setSiderItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [sortListWeekData, setSortListWeekData] = useState([])
  const [selectKey, setSelectKey] = useState({})
  const navigate = useNavigate();

  let search = new URLSearchParams(useLocation().search).get("key");
  let lastPath = getLastPath();

  useEffect(() => {
    let weekList = []
    sortListWeekData.length > 0 && sortListWeekData.map(data => {
      weekList.push(getItem(<Link to={`weekTable?key=${data.weekName}`}>{data.weekName}</Link>, data.weekName, <CarryOutOutlined />))
    })
    let siderItems = []
    if (user.isAdmin) {
      siderItems = [...items]
    }
    siderItems = [
      ...siderItems,
      getItem("Haftalar", "weeks", <CalendarOutlined />, weekList)
    ]
    setSiderItems(siderItems);
  }, [sortListWeekData])

  useEffect(() => {
    siderUpdate()
  }, [updateSider])

  useEffect(() => {
    if (lastPath === 'homePage' && sortListWeekData.length > 0) {
      const todayDate = getTodayDate()
      const weekData = sortListWeekData.find(data => {
        return data.daysOfWeek.includes(todayDate)
      })
      if (weekData != null) {
        navigate(`/homePage/weekTable?key=${weekData.weekName}`)
      } else {
        navigate(`/homePage/weekTable?key=${sortListWeekData[0].weekName}`)
      }
    }
  }, [siderItems])


  //TODO:=========================

  function sortArrayWithDate(array) {
    let sortList = array.sort((a, b) => {
      if (a.startOfWeek === b.startOfWeek) {
        return a.weekName.localeCompare(b.weekName)
      } else {
        return new Date(b.startOfWeek) - new Date(a.startOfWeek)
      }
    })
    return sortList
  }

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = (today.getDate()).toString().padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate
  }

  const siderUpdate = () => {
    week.getAllWeekData()
      .then(ress => ress.data)
      .then(data => {
        let sortList = []
        switch (data.responseType) {
          case "SUCCESS":
            if (data.responseData.length !== 0) {
              data.responseData.map((data) => {
                sortList.push({ weekName: data.weekName, daysOfWeek: data.daysOfWeek, startOfWeek: data.daysOfWeek[0] })
              })
              sortList = sortArrayWithDate(sortList);
            }
            setSortListWeekData(sortList);
            break
          case "ERROR":

            break
        }
      }).catch(e => {
        Toast(e.message, "error", 2000)
      })
  }



  const logOut = () => {
    auth.logOut(localStorage.getItem("username"))
      .then(ress => ress.data)
      .then(data => {
        switch (data.responseType) {
          case "SUCCESS":
            localStorage.clear()
            navigate("/")
            Toast(data.responseMessage, "success", 1500)
            break;
          case "ERROR":
            Toast(data.responseMessage, "error", 2000)
            break;
        }
      })
      .catch(e => {
        Toast(e.message, "error", 2000)
      }
      )
  };
  useEffect(() => {
    setSelectKey({ lastPath: lastPath, search: search })
  }, [search, lastPath])

  useEffect(() => {
    if (selectKey.search !== null) {
      switch (selectKey.lastPath) {
        case "weekTable":
          setSelectWeek({ currentSelectedKey: selectKey.search, lastSelectedKey: selectKey.search })
          break;

      }
    }
  }, [selectKey])

  return localStorage.getItem("isActive") === "true"
    ?
    (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className="flex flex-col justify-between "
            style={{ minHeight: "100%" }}
          >
            <div className="text">
              <div className="demo-logo-vertical" />
              <div className="bg-sky-600 text-center uppercase font-bold text-white">
                {user.name}
              </div>
              <hr className="my-1"></hr>

              <Menu
                theme="dark"
                mode="inline"
                items={siderItems}
                selectedKeys={selectKey.search || selectKey.lastPath}
              />
            </div>
            <div className="text-center my-3 px-2">
              <PopUp
                title={"Çıkış"}
                type="warning"
                description="Çıkmak istediğinize emin misinz ?"
                onConfirm={logOut}
              >
                <Button
                  type="primary"
                  className="px-1 text-white bg-blue-600 rounded text-center text-xs font-bold tracking-wider"
                  style={{ minWidth: "100%" }}
                >
                  Çıkış Yap
                </Button>
              </PopUp>
            </div>
          </div>
        </Sider>
        <Layout>
          <Toaster
            position="bottom-right"
            reverseOrder={false} />
          <Routes>
            <Route path="weekTable" element={<WeekTablePage selectWeek={selectWeek} setSelectWeek={setSelectWeek} setUpdateSider={setUpdateSider} />} />
            <Route path="createTable" element={<CreateTablePage setSelectWeek={setSelectWeek} setUpdateSider={setUpdateSider} />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="userSettings" element={<UserSettingsPage />} />
          </Routes>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ali Ekşioğlu
          </Footer>
        </Layout>
      </Layout>
    )
    : <center>
      <h1 className="text-xl text-center">
        USER NOT ACTIVE
      </h1>
    </center>
}

export default HomePage;
