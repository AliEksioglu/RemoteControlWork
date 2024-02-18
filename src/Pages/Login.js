import "../style/imageStyle.css"
import { Button, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import auth from "../service/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Toaster } from 'react-hot-toast';
import Toast from '../components/Toast';

function Login() {

  const [form] = useForm();
  const navigate = useNavigate();
  function authCheck() {
    let user;
    form.validateFields().then((formValue) => {
      user = { email: formValue.email, password: formValue.password };
      DBLogin(user);
    });
  }

  useEffect(() => {
    localStorage.clear();
  }, [])

  function DBLogin(tempUser) {
    auth.login(tempUser)
      .then(ress => ress.data)
      .then(data => {
        switch (data.responseType) {
          case "SUCCESS":
            Toast(data.responseMessage,"success",1500,"light")
            localStorage.setItem("name", data.responseData.name)
            localStorage.setItem("username", data.responseData.username)
            localStorage.setItem("isAdmin", data.responseData.admin)
            localStorage.setItem("isActive", data.responseData.active)
            navigate("/homePage");
            break;
          case "ERROR":
            Toast(data.responseMessage,"error",2000,"light")
            break;
        }
      })
      .catch(e => {
        Toast(e.message,"error",2000,"light")
      })
  }

  return (
    <>
      <Toaster  position="top-center" />
      <div className="login-bg-image">
        <center>
          <div className="login-form-bg-image sm:w-10/12 md:w-6/12 lg:w-3/5 xl:w-2/5  container mt-0 py-4 border-2 border-slate-200 rounded-xl drop-shadow-xl">
            <h3 className="text-center uppercase font-bold">Login</h3>
            <hr className="my-3 mx-4 rounded-xl h-1 border-black" />
            <Form
              className="mx-2 "
              name="basic"
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 14,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: false,
              }}
              autoComplete="off"
              form={form}
              onFinish={authCheck}
            >
              <Form.Item
                className="text-white login-page"
                label="E-mail: "
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your emai!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="test@gmail.com"
                  autoComplete="false"
                />
              </Form.Item>
              <Form.Item
                className="mb-2 login-page"
                label="Password: "
                labelAlign="center"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  }, {
                    min: 3,
                    message: "must be at least 3 characters"
                  }
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder="*******"
                  autoComplete="false"
                />
              </Form.Item>
              <div
                className="flex-col justify-center mt-4"
                style={{ justifyContent: "center" }}
              >
                <Row style={{ display: "block" }}>
                  <Button
                    className="p-1 my-2 w-3/12 text-center text-white bg-gray-700 mt-2 rounded-xl font-bold"
                    type="primary"
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Row>
              </div>
            </Form>
          </div>
        </center>
      </div>
    </>
  );
}

export default Login;
