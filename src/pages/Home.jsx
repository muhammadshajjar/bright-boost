import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";

import { Link } from "react-router-dom";

const SESSIONSAPIURL = "http://localhost:3000/session";
const CATEGORIESAPIURL = "http://localhost:3000/categories";
const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(SESSIONSAPIURL);
        const sessions = response.data;

        if (sessions.length === 0) {
          createNewSession();
        } else {
          const lastSession = sessions[sessions.length - 1];

          const currentDate = new Date().toISOString().split("T")[0];

          if (lastSession.date !== currentDate) {
            createNewSession();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    };

    const createNewSession = async () => {
      const currentDate = new Date().toISOString().split("T")[0];
      const newSession = {
        date: currentDate,
        studentsAttended: 0,
        questionsAnswered: 0,
      };

      await axios.post(SESSIONSAPIURL, newSession);
    };

    const getAllCategories = async () => {
      try {
        const response = await axios.get(CATEGORIESAPIURL);
        setCategories(response.data);
      } catch (e) {
        alert(e.message);
      }
    };
    checkSession();
    getAllCategories();
  }, []);

  return (
    <Row>
      {categories.map((category) => (
        <Link
          to="/discussion-fourm"
          state={{ id: category.id, title: category.title }}
          key={category.id}
        >
          {category.title}
        </Link>
      ))}
    </Row>
  );
};

export default Home;
