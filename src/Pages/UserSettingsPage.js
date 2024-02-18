import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function UserSettingsPage(){

    return(
        <>
        <Layout>
          <Header
            className="bg-white p-0 drop-shadow-md"
            style={{
              backgroundColor: "white"
            }}
          >
            <div className="font-bold font-mono uppercase text-2xl tracking-widest py-4 text-center">
              Kullanıcı Ayarları
            </div>
            <hr></hr>
          </Header>
          <Content className="mx-3 mt-2 p-3">
            <hr className="my-2"></hr>
            <div className="container flex justify-center" >

            </div>
          </Content>
        </Layout>
      </>
    )

}

export default UserSettingsPage