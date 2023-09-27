import "./Stats.css";

import { Row, Col } from "antd";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import StatsTutor from "../components/StatsTutor";
import { useEffect } from "react";
import axios from "axios";

const SESSIONSAPIURL = "http://localhost:3000/session";
const TUTORSAPIURL = "http://localhost:3000/tutors";
const Stats = () => {
  useEffect(() => {
    console.log("This runs first time...");
    const getAllSessionsData = async () => {
      const response = await axios.get(SESSIONSAPIURL);
      console.log(response.data);
      mapSessionsDataWithTutors(response.data);
    };

    getAllSessionsData();
  }, []);

  const mapSessionsDataWithTutors = async (data) => {
    console.log(data);

    const updatedSession = [];

    const response = await axios.get(TUTORSAPIURL);
    const tutorsData = response.data;

    data.forEach((item) => {
      const joinedTutors = item.tutorsJoind.map((tutor) => {
        // Find the tutor in tutorsData based on the tutor ID.
        return tutorsData.find((tutorData) => tutorData.id === tutor.tutorID);
      });

      // Now, 'joinedTutors' contains an array of tutor details who joined the session 'item'.
      console.log(joinedTutors);
    });
  };
  return (
    <div className="container">
      <Row className="page-heading" align="middle">
        <div>
          <Link to="/home">
            <BiArrowBack style={{ color: "white" }} />
          </Link>
        </div>
        <h1>Stats</h1>
      </Row>

      <Row justify="center" className="stats-container">
        <Col>
          <div className="stats-head">Mon 25,2023</div>
          <div className="stats-content">
            <h3>Avaliable Tutors</h3>
            <div className="tutor-stats">
              <StatsTutor />
              <StatsTutor />
            </div>

            <h3>Others</h3>
            <div className="count-stats">
              <h4>
                Students Joined:<span>20</span>
              </h4>
              <h4>
                Questions Answerd:<span>20</span>
              </h4>
              <h4 className="answering-time">Average Answering Time</h4>
              <ul>
                <li>Sikander Hyat : 20mins</li>
                <li>Imran Ahmed : 10mins</li>
              </ul>
            </div>
          </div>
        </Col>
        <Col>
          <div className="stats-head">Mon 26,2023</div>
          <div>20 students joined.</div>
        </Col>
        <Col>
          <div className="stats-head">Mon 27,2023</div>
          <div>20 students joined.</div>
        </Col>
        <Col>
          <div className="stats-head">Mon 28,2023</div>
          <div>20 students joined.</div>
        </Col>
        <Col>
          <div className="stats-head">Mon 29,2023</div>
          <div>20 students joined.</div>
        </Col>
        <Col>
          <div className="stats-head">Mon 30,2023</div>
          <div>20 students joined.</div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
