import "./Authentication.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { Row, Col, Card, Button } from "antd";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router";
import illustration from "../assets/login-illustration.png";
import ChooseRole from "../components/ChooseRole";
import LoginForm from "../components/LoginForm";

const Authentication = () => {
  const navigate = useNavigate();
  const { token, role, removeRole } = useContext(AuthContext);

  // should call navigate() in a useEffect(), not when your component is first rendered.

  useEffect(() => {
    if (token && role !== "admin") {
      navigate("/home");
    } else if (token && role === "admin") {
      navigate("/admin");
    }
  }, [token]);

  return (
    <Card bordered={false} className="card">
      {role && role !== "admin" && (
        <Row justify="space-between" className="card__content">
          <Col span={8} className="card__left">
            <h3>Start your journey with us as {role}</h3>
            <img src={illustration} alt="Login Illustration" />
            <Button onClick={() => removeRole()}>Change Role</Button>
          </Col>
          <Col span={16} className="card__right">
            <Outlet />
          </Col>
        </Row>
      )}
      {role === "admin" && (
        <Row justify="space-between" className="card__content">
          <Col span={8} className="card__left">
            <h3>Start your journey with us as {role}</h3>
            <img src={illustration} alt="Login Illustration" />
            <Button onClick={() => removeRole()}>Change Role</Button>
          </Col>
          <Col span={16} className="card__right">
            <LoginForm />
          </Col>
        </Row>
      )}
      {!role && <ChooseRole />}
    </Card>
  );
};

export default Authentication;
