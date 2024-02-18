import { Button, Checkbox, Form, Input, Row, Col , Layout} from "antd";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import { useState } from "react";
import auth from "../service/auth";
import { useNavigate } from "react-router";
import "../style/imageStyle.css"
import Toast from "../components/Toast";
//! ====================================

function RegisterPage() {

  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false)
  const { Header, Content } = Layout;
  const [form] = useForm();
  const navigate = useNavigate()
  const registerUser = () => {
    setRegisterButtonDisabled(true)
    form.validateFields().then((formValue) => {
      let user = {
        username: formValue.username.trim(),
        name: formValue.name.trim(),
        email: formValue.email.trim(),
        password: formValue.password,
        isActive: false,
        isAdmin: formValue.isAdmin,
      };
      if (formValue.repassword === formValue.password) {
        SaveUser(user)
      } else {
        Toast("Şifreler eşleşmedi","error",1500)
        setRegisterButtonDisabled(false)
      }
    });
  };


  function SaveUser(tempUser) {
    auth.register(tempUser)
      .then(ress => ress.data)
      .then(data => {
        switch (data.responseType) {
          case "SUCCESS":
            Toast(data.responseMessage,"success",1500)
            navigate("/homePage")
            break;
          case "ERROR":
            Toast(data.responseMessage,"error",1500)
            setRegisterButtonDisabled(false);
            break;
        }
      }).catch(e => {
        Toast(e.message,"error",2000)
        setRegisterButtonDisabled(false);
      })
  }

  return (
    <>
      <Layout>
        <Header
          className="bg-white p-0 drop-shadow-md"
          style={{
            backgroundColor: "white"
          }}
        >
          <div className="font-bold font-mono uppercase text-2xl tracking-widest py-4 text-center">
            Kullanıcı Oluştur
          </div>
          <hr></hr>
        </Header>
        <Content className="mx-3 mt-2 p-3">
          <hr className="my-2"></hr>
          <div className="container flex justify-center" >
            <Col className="sm:w-10/12 md:w-6/12 lg:w-3/5 w-2/5  login-form-bg-image container mt-5 py-4 border-2 border-slate-200 rounded-xl drop-shadow-xl" >
              <Form
                name="basic"
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: false,
                }}
                autoComplete="off"
                form={form}
                onFinish={registerUser}
              >
                <Form.Item
                  label="Kullanıcı Adı:"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    }, {
                      min: 3
                    }
                  ]}
                  hasFeedback
                >
                  <Input autoComplete="false" />
                </Form.Item>
                <Form.Item
                  label="İsim: "
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    }, {
                      min: 3
                    }
                  ]}
                  hasFeedback
                >
                  <Input autoComplete="false" />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: "Please input your e-mail!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input autoComplete="false" />

                </Form.Item>

                <Form.Item
                  label="Şifre"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    }, {
                      min: 3
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password autoComplete="false" />
                </Form.Item>
                <Form.Item
                  className="mb-2"
                  label="Şifre Onayla"
                  name="repassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    }, {
                      min: 3
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password autoComplete="false" />
                </Form.Item>
                <Form.Item
                  name="isAdmin"
                  className="flex justify-center mb-2"
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox className="font-bold" > Admin</Checkbox>
                </Form.Item>
                <Row className="flex justify-center">
                  <Button
                    className='text-center w-1/5 font-bold bg-blue-500 border-gray-400 border-1 text-white drop-shadow-md hover:bg-white hover:border-gray-200 hover:text-blue-500'
                    type=""
                    size="medium"
                    htmlType="submit"
                    disabled={registerButtonDisabled}
                  >
                    Kaydet
                  </Button>
                </Row>
              </Form>
            </Col>
          </div>
        </Content>
      </Layout>
    </>
  );
}


export default RegisterPage;
