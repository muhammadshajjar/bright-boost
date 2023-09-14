import { useContext, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import axios from "axios";

import ExpertiesTag from "./ExpertiesTag";

let SIGNUPAPIURL = "http://localhost:3000/tutors";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [expertiesArea, setExpertiesAreas] = useState([]);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const formSubmitHandler = async (values) => {
    const requestBody = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
    };

    let successMessage = "Tutor Account Created Successfully!";

    if (authCtx.role === "student") {
      SIGNUPAPIURL = "http://localhost:3000/students";
      successMessage = "Student Account Created Successfully!";
    } else {
      requestBody.expertiesArea = expertiesArea;
    }

    try {
      setIsLoading(true);
      await axios.post(SIGNUPAPIURL, requestBody);
      setIsLoading(false);
      notification.success({
        message: successMessage,
      });
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      notification.error({
        message: err?.response?.data?.message || "An error occurred.",
      });
    }
  };
  return (
    <div className="form">
      <p>
        Already have an account? <Link to="/login">Login now</Link>
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
          hasFeedback
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please enter your First name!",
            },
          ]}
        >
          <Input placeholder="First Name" className="input" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please enter your Last name!",
            },
          ]}
        >
          <Input placeholder="Last Name" className="input" />
        </Form.Item>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "The input is not valid email!",
            },
          ]}
        >
          <Input placeholder="Email" className="input" />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            { min: 6, message: "Password must be minimum 6 characters." },
          ]}
        >
          <Input.Password placeholder="Password" className="input" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" className="input" />
        </Form.Item>

        {authCtx.role === "tutor" && (
          <Form.Item>
            <ExpertiesTag
              setExpertiesAreas={setExpertiesAreas}
              expertiesArea={expertiesArea}
            />
          </Form.Item>
        )}

        <div className="auth-btn">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignupForm;
