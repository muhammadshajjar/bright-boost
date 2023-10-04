import "./Stats.css";

import { Row, Col, Button } from "antd";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import StatsTutor from "../components/StatsTutor";
import { useEffect, useState } from "react";
import axios from "axios";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getCalendarFormatDate } from "../helper/getCalendarFormatDate";

const SESSIONSAPIURL = "http://localhost:3000/session";
const TUTORSAPIURL = "http://localhost:3000/tutors";

import { Line } from "@ant-design/plots";

const Stats = () => {
  const [sessionData, setSessionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getAllSessionsData = async () => {
      try {
        const response = await axios.get(SESSIONSAPIURL);
        mapSessionsDataWithTutors(response.data);
      } catch (e) {
        console.error(e.message);
      }
    };

    getAllSessionsData();
  }, []);

  const mapSessionsDataWithTutors = async (data) => {
    const updatedSession = [];

    const response = await axios.get(TUTORSAPIURL);
    const tutorsData = response.data;

    data.forEach((item) => {
      const joinedTutors = item.tutorsJoind.map((tutor) => {
        // Find the tutor in tutorsData based on the tutor ID.
        return tutorsData.find((tutorData) => tutorData.id === tutor.tutorID);
      });
      updatedSession.push({ ...item, tutorsJoind: joinedTutors });
    });
    updatedSession.reverse();
    setSessionData(updatedSession);
  };
  // Calculate the range of sessions to display based on the current page index.
  const startIndex = currentPage * 5;
  const endIndex = startIndex + 5;
  // const sessionsToDisplay = sessionData.slice(startIndex, endIndex);
  const sessionsToDisplay = Array.from({ length: 5 }, (_, index) =>
    sessionData[startIndex + index]
      ? sessionData[startIndex + index]
      : {
          date: "No session",
          tutorsJoind: [],
          studentsAttended: 0,
          questionsAnswered: 0,
        }
  );

  sessionsToDisplay.reverse();

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const config = {
    data: sessionData || [],
    padding: "auto",
    xField: "date",
    yField: "studentsAttended",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: true,
    lineStyle: {
      stroke: "#ffb84d",
      lineWidth: 2,
      cursor: "pointer",
    },
    tooltip: {
      customContent: (title, items) => {
        return (
          <>
            <h3 style={{ marginTop: 16 }}>{title}</h3>
            <ul style={{ paddingLeft: 0 }}>
              {items?.map((item, index) => {
                const { name, value, color } = item;
                return (
                  <li
                    key={item.year}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{
                      marginBottom: 4,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        flex: 1,
                        justifyContent: "space-between",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <span style={{ marginRight: 16 }}>
                          Students Joined:
                        </span>
                        <span className="g2-tooltip-list-item-value">
                          {value}
                        </span>
                      </div>

                      <div>
                        <span style={{ marginRight: 16 }}>
                          Questions Answered:
                        </span>
                        <span className="g2-tooltip-list-item-value">
                          {item.data.questionsAnswered}
                        </span>
                      </div>
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        );
      },
    },
  };
  console.log(sessionData);
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
        {sessionsToDisplay.map((session, index) => (
          <Col key={index}>
            <div className="stats-head">
              {getCalendarFormatDate(session.date)}
            </div>
            <div className="stats-content">
              <h3>Avaliable Tutors</h3>
              <div className="tutor-stats">
                {session.tutorsJoind &&
                  session.tutorsJoind.map((tutor, tutorIndex) => (
                    <StatsTutor key={tutorIndex} tutor={tutor} />
                  ))}
                {!session.tutorsJoind.length > 0 && (
                  <p>No Tutor Joined this session</p>
                )}
              </div>

              <h3>Others</h3>
              <div className="count-stats">
                <h4>
                  Students Joined:<span>{session.studentsAttended}</span>
                </h4>
                <h4>
                  Questions Answered:<span>{session.questionsAnswered}</span>
                </h4>
                {/* Render other stats here */}
              </div>
            </div>
          </Col>
        ))}
      </Row>
      <Row className="pagination" justify="end">
        <Button
          onClick={handleNextPage}
          disabled={endIndex >= sessionData.length}
          icon={<FiArrowLeft />}
          size="large"
          shape="circle"
        />
        <Button
          onClick={handlePreviousPage}
          disabled={startIndex === 0}
          icon={<FiArrowRight />}
          size="large"
          shape="circle"
        />
      </Row>

      <div className="charts-container">{<Line {...config} />}</div>
    </div>
  );
};

export default Stats;
