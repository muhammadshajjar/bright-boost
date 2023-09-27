import { useEffect, useState, useContext } from "react";

import "./Home.css";
import axios from "axios";
import { Row, Col, Button } from "antd";

import { Link } from "react-router-dom";

import whyUsIllustration from "../assets/why-us-illustraion-bg.png";
import firstProfile from "../assets/profile-1.jpg";
import secondProfile from "../assets/profile-2.jpg";
import thirdProfile from "../assets/profile-3.jpg";
import { PiDotDuotone } from "react-icons/pi";
import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";

import logo from "../assets/brightbosstlogo.png";

const SESSIONSAPIURL = "http://localhost:3000/session";
const CATEGORIESAPIURL = "http://localhost:3000/categories";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // const checkSession = async () => {
    //   try {
    //     const response = await axios.get(SESSIONSAPIURL);
    //     const sessions = response.data;

    //     if (sessions.length === 0) {
    //       createNewSession();
    //     } else {
    //       const lastSession = sessions[sessions.length - 1];

    //       const currentDate = new Date().toISOString().split("T")[0];

    //       if (lastSession.date !== currentDate) {
    //         createNewSession();
    //       }
    //     }
    //   } catch (e) {
    //     alert(e.message);
    //   }
    // };

    // const createNewSession = async () => {
    //   const currentDate = new Date().toISOString().split("T")[0];
    //   const newSession = {
    //     date: currentDate,
    //     studentsAttended: 0,
    //     questionsAnswered: 0,
    //   };

    //   await axios.post(SESSIONSAPIURL, newSession);
    // };

    const getAllCategories = async () => {
      try {
        const response = await axios.get(CATEGORIESAPIURL);
        setCategories(response.data);
      } catch (e) {
        alert(e.message);
      }
    };

    // checkSession();
    getAllCategories();
  }, []);

  return (
    <>
      <section className="hero container">
        <div className="hero-content">
          <h1>
            Guiding <span>Students</span> Towards Academic Excellence
          </h1>
          <p>
            At Bright Boost, we're more than just an after-school program. We're
            a community dedicated to helping high school students excel in their
            studies. Our mission is to provide the support and resources they
            need to thrive academically.
          </p>
          <Button type="primary">Discover now</Button>
        </div>
      </section>
      <section className="categories">
        <div className="categories-content container">
          <h2>Popular Categories</h2>
          <p>Please choose any category to go on dicussion forum page</p>
          <Row className="item-container" justify="space-between">
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  to="/discussion-fourm"
                  state={{ id: category.id, title: category.title }}
                >
                  <p> {category.title}</p>
                </Link>
              </div>
            ))}
          </Row>
        </div>
      </section>
      <section className="why-us container">
        <Row justify="space-between" align="middle">
          <Col span={14}>
            <img src={whyUsIllustration} alt="" />
          </Col>
          <Col span={10}>
            <h2>Why Choose Bright Boost</h2>
            <p>
              Unlike traditional tutoring programs that may focus solely on
              providing answers to academic questions, Bright Boost takes a
              holistic approach to education.
            </p>

            <ul className="list">
              <Row align="middle">
                <PiDotDuotone style={{ color: "#ffb84d", fontSize: "50px" }} />
                <p>Comprehensive Support</p>
              </Row>
              <Row align="middle">
                <PiDotDuotone style={{ color: "#ffb84d", fontSize: "50px" }} />
                <p>Continuous Improvement</p>
              </Row>
              <Row align="middle">
                <PiDotDuotone style={{ color: "#ffb84d", fontSize: "50px" }} />
                <p>Engagement and Collaboration</p>
              </Row>
              <Row align="middle">
                <PiDotDuotone style={{ color: "#ffb84d", fontSize: "50px" }} />
                <p>Long-Term Goals</p>
              </Row>
              <Row align="middle">
                <PiDotDuotone style={{ color: "#ffb84d", fontSize: "50px" }} />
                <p>Personalized Guidance</p>
              </Row>
            </ul>
          </Col>
        </Row>
      </section>
      <section className="review">
        <div className="container">
          <div className="review-heading">
            <h2>Our Happy Students</h2>
            <p>We always takecare of our students and they are very happy.</p>
          </div>
          <div className="testimonials">
            <figure className="testimonial__card card-first">
              <blockquote>
                <p className="quote__text">
                  I can't thank Bright Boost enough for their commitment to my
                  education. The tutors are not only knowledgeable but also
                  patient and understanding. They've helped me tackle
                  challenging subjects.
                </p>
              </blockquote>

              <figcaption className="profile">
                <img
                  className="profile__img"
                  src={firstProfile}
                  alt="Satish Patel"
                />
                <div>
                  <h3 className="profile__title">Satish Patel</h3>
                  <p className="profile__disc">Happy customer</p>
                </div>
              </figcaption>
            </figure>
            <figure className="testimonial__card">
              <blockquote>
                <p className="quote__text">
                  Bright Boost has been a game-changer for me. The personalized
                  support I've received has boosted my confidence in subjects I
                  used to struggle with. The interactive environment is
                  incredible, and I love collaborating with my peers.
                </p>
              </blockquote>

              <figcaption className="profile">
                <img
                  className="profile__img"
                  src={secondProfile}
                  alt="Bruce Mckenzie"
                />
                <div>
                  <h3 className="profile__title">Bruce McKenzie</h3>
                  <p className="profile__disc">Happy customer</p>
                </div>
              </figcaption>
            </figure>
            <figure className="testimonial__card">
              <blockquote>
                <p className="quote__text">
                  I can't express how grateful I am for Bright Boost! As a high
                  school student with a busy schedule, their flexible
                  after-school sessions have been a lifesaver. The tutors here
                  are fantastic – they've helped me not only with my homework
                </p>
              </blockquote>

              <figcaption className="profile">
                <img
                  className="profile__img"
                  src={thirdProfile}
                  alt="Iva Boyd"
                />
                <div>
                  <h3 className="profile__title">Iva Boyd</h3>
                  <p className="profile__disc">Happy customer</p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <footer>
        <div className="container footer-container">
          <img className="footer-logo" src={logo} alt="" />
          <p className="footer-desc">
            Empowering Students, Illuminating Futures - Bright Boost: Your
            Trusted Partner in Academic Excellence and Success
          </p>

          <div className="footer-media">
            <a href="#">
              <BiLogoFacebook style={{ fontSize: "25px", color: "white" }} />
            </a>
            <a href="#">
              <BsInstagram style={{ fontSize: "25px", color: "white" }} />
            </a>
            <a href="#">
              <BiLogoLinkedin style={{ fontSize: "25px", color: "white" }} />
            </a>
            <a href="#">
              <RiTwitterXLine style={{ fontSize: "25px", color: "white" }} />
            </a>
          </div>
          <div className="attribution">
            <p>&copy; Copyright.2023</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
