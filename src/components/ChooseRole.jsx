import { useContext } from "react";
import "./ChooseRole.css";
import { AuthContext } from "../context/auth-context";

import { Row, Col, Button } from "antd";

import teacherCard from "../assets/Teacher.png";
import studentCard from "../assets/Student.png";

const ChooseRole = () => {
  const { specifyRole } = useContext(AuthContext);
  return (
    <>
      <Row>
        <Col
          span={12}
          className="rolecard"
          onClick={() => specifyRole("tutor")}
        >
          <img src={teacherCard} alt="" />
        </Col>
        <Col
          span={12}
          className="rolecard"
          onClick={() => specifyRole("student")}
        >
          <img src={studentCard} alt="" />
        </Col>
      </Row>
      <div className="admin-action">
        <p>OR</p>
        <Button type="primary" onClick={() => specifyRole("admin")}>
          Start as a admin
        </Button>
      </div>
    </>
  );
};

export default ChooseRole;
