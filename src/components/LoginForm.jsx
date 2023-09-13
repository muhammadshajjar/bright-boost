import { useContext, useState } from "react";
import { Button, Form, Input, notification } from "antd";

import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import axios from "axios";

let LOGINAPIURL = "http://localhost:3000/tutors";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  console.log(authCtx.role);

  if (authCtx.role === "student") {
    LOGINAPIURL = "http://localhost:3000/students";
  }

  const formSubmitHandler = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${LOGINAPIURL}?email=${values.email}`);
      if (response.data.length > 0) {
        const { password } = response.data[0];
        if (password == values.password) {
          authCtx.login("Login");
          notification.success({
            message: "Login Successfully!",
          });
        } else {
          notification.error({
            message: "User Password doesn't match",
          });
        }
      } else {
        notification.error({
          message: "Email not exist.",
        });
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      notification.error({
        message: "Something Went Wrong.",
      });
    }
  };

  return (
    <div className="form">
      <p>
        Dont have an account? <Link to="/">SignUp now</Link>{" "}
      </p>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={formSubmitHandler}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your valid email!",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Email" className="input" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" className="input" />
        </Form.Item>
        <div className="auth-btn">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Login In
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default LoginForm;