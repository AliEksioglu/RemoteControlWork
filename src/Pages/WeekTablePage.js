import { Layout } from "antd";
import WeekTable from "../components/WeekTable"

function WeekTablePage({selectWeek,setSelectWeek,setUpdateSider}) {
    const { Header, Content } = Layout;
    return (
        <Layout>
            <Header
                className="bg-white p-0 drop-shadow-md"
                style={{
                    backgroundColor: "white"
                }}
            >
                <div className="font-bold font-mono uppercase text-2xl tracking-widest py-4 text-center">
                    Hafta Planlama{" "}
                </div>
                <hr></hr>
            </Header>
            <Content className="mx-3 mt-2 p-3">
                <div>
                    <WeekTable selectWeek={selectWeek} setSelectWeek={setSelectWeek} setUpdateSider={setUpdateSider} />
                </div>
            </Content>
        </Layout>
    )
}

export default WeekTablePage