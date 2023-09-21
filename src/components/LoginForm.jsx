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
  if (authCtx.role === "admin") {
    LOGINAPIURL = "http://localhost:3000/admin";
  }
  if (authCtx.role == "tutor") {
    LOGINAPIURL = "http://localhost:3000/tutors";
  }

  const formSubmitHandler = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${LOGINAPIURL}?email=${values.email}`);
      console.log(response);

      if (response.data.length > 0) {
        const { password, id, firstname, lastname } = response.data[0];

        const userData = {
          id,
          firstname,
          lastname,
        };

        console.log(firstname, lastname);

        if (password == values.password) {
          console.log("HERE");
          authCtx.login(userData);
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
      {authCtx.role !== "admin" && (
        <p>
          Dont have an account? <Link to="/">SignUp now</Link>{" "}
        </p>
      )}
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
