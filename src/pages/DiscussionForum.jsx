import { useEffect, useState, useContext } from "react";
import "./DiscussionForum.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewThreadForm from "../components/NewThreadForm";

import { Row, Col, Space, Input, Button } from "antd";

import { getTimeAgo } from "../helper/getTimeAgo";

import { AuthContext } from "../context/auth-context";

import { FaAngleRight } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import { Link } from "react-router-dom";
import { getTotalTimeToComplete } from "../helper/getTotalTimeToComplete";

import { notification } from "antd";

const DiscussionForum = () => {
  const location = useLocation();
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  const [answer, setAnswer] = useState("");
  const { firstName, lastName, role } = useContext(AuthContext);

  useEffect(() => {
    const getThreads = async () => {
      const response = await axios.get(
        `http://localhost:3000/categories/${location.state.id}/threads`
      );

      setThreads(response.data);
    };
    getThreads();
  }, []);

  const handleThreadClick = (threadId) => {
    const activeThread = threads.find((thread) => thread.id === threadId);
    setSelectedThread(activeThread);
    setSelectedQuestion(null);
  };

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(
      selectedThread.questions.find((question) => question.id === questionId)
    );
  };

  const handleNewThreadSubmit = async () => {
    if (newThread.trim() === "") {
      alert("Please enter a thread title.");
      return;
    }

    const newThreadObj = {
      title: newThread,
      questions: [],
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/categories/${location.state.id}/threads`,
        newThreadObj
      );

      setThreads((prevThreads) => {
        return [...prevThreads, response.data];
      });

      notification.success({
        message: "New Thread Added!",
      });
    } catch (e) {
      alert(e.message);
    }

    console.log(newThreadObj);
  };

  const handleNewQuestion = async (enteredQuestion) => {
    let updateSelectedThread = { ...selectedThread };
    updateSelectedThread.questions.push(...enteredQuestion);
    setSelectedThread(updateSelectedThread);

    console.log(updateSelectedThread.id);

    try {
      await axios.put(
        `http://localhost:3000/threads/${updateSelectedThread.id}`,
        updateSelectedThread
      );
      notification.success({
        message: "New Question added Successfully!",
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleAnswerSubmit = async () => {
    console.log(answer);
    let updateSelectedThread = { ...selectedThread };
    let updateSelectedQuestion = { ...selectedQuestion };

    const discussionObj = {
      reply: `${firstName} ${lastName}`,
      repliedAt: new Date(),
      content: answer,
    };

    if (!updateSelectedQuestion.discussion) {
      updateSelectedQuestion.discussion = [];
    }

    updateSelectedQuestion.discussion.push(discussionObj);

    const questionIndexToUpdate = selectedThread.questions.findIndex(
      (question) => question.id === selectedQuestion.id
    );

    if (questionIndexToUpdate !== -1) {
      updateSelectedThread.questions[questionIndexToUpdate] =
        updateSelectedQuestion;
    } else {
      console.log(
        "Question not found in the selectedThread's questions array."
      );
    }

    try {
      await axios.put(
        `http://localhost:3000/threads/${updateSelectedThread.id}`,
        updateSelectedThread
      );
      setAnswer("");
      notification.success({
        message: "Answer posted Successfully",
      });
    } catch (e) {
      alert(e.message);
    }
    setSelectedQuestion(updateSelectedQuestion);
  };

  const assignQustionToTuturHandler = async () => {
    console.log("Assign");
    let updateSelectedQuestion = { ...selectedQuestion };
    let updateSelectedThread = { ...selectedThread };

    const assignObj = {
      tutor: `${firstName} ${lastName}`,
      assignedAt: new Date(),
      completed: false,
      completedAt: "",
    };
    updateSelectedQuestion.assigned = assignObj;

    const questionIndexToUpdate = selectedThread.questions.findIndex(
      (question) => question.id === selectedQuestion.id
    );

    if (questionIndexToUpdate !== -1) {
      updateSelectedThread.questions[questionIndexToUpdate] =
        updateSelectedQuestion;
    } else {
      console.log(
        "Question not found in the selectedThread's questions array."
      );
    }
    try {
      await axios.put(
        `http://localhost:3000/threads/${updateSelectedThread.id}`,
        updateSelectedThread
      );

      setSelectedThread(updateSelectedThread);
      setSelectedQuestion(updateSelectedQuestion);
      notification.success({
        message: "Question is Assigned!",
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const markAsCompleteHandler = async () => {
    let updateSelectedThread = { ...selectedThread };
    let updateSelectedQuestion = { ...selectedQuestion };

    updateSelectedQuestion.assigned.completed = true;
    updateSelectedQuestion.assigned.completedAt = new Date();

    console.log(selectedThread);

    const questionIndexToUpdate = selectedThread.questions.findIndex(
      (question) => question.id === selectedQuestion.id
    );

    console.log(questionIndexToUpdate);

    updateSelectedThread.questions[questionIndexToUpdate] =
      updateSelectedQuestion;

    console.log(selectedThread);
    try {
      await axios.put(
        `http://localhost:3000/threads/${updateSelectedThread.id}`,
        updateSelectedThread
      );

      notification.success({
        message: "Question Mark as completed !!",
      });
    } catch (e) {
      alert(e.message);
    }

    setSelectedQuestion(null);
    setSelectedThread(updateSelectedThread);
  };

  console.log(selectedThread);
  return (
    <div className="container">
      <Row className="page-heading" align="middle">
        <div>
          <Link to="/home">
            <BiArrowBack style={{ color: "white" }} />
          </Link>
        </div>
        <h1>Discussion Forum</h1>
        <FaAngleRight />
        <span> {location.state.title}</span>
      </Row>
      <Row className="thread-view">
        <Col span={4} className="column">
          <h2 className="title">Threads</h2>
          <ul>
            {threads.map((thread) => (
              <li key={thread.id} onClick={() => handleThreadClick(thread.id)}>
                {thread.title}
              </li>
            ))}
          </ul>
          <Space.Compact className="new-action">
            <Input
              className="newthread"
              placeholder="add new thread"
              onChange={(e) => setNewThread(e.target.value)}
              value={newThread}
            />
            <Button type="primary" onClick={handleNewThreadSubmit}>
              Add
            </Button>
          </Space.Compact>
        </Col>
        <Col span={8} className="column ">
          <h2 className="title">Questions</h2>
          {selectedThread && (
            <>
              <ul>
                {selectedThread?.questions?.map((question) => (
                  <>
                    {!question.assigned.completed && (
                      <li
                        key={question.id}
                        onClick={() => handleQuestionClick(question.id)}
                      >
                        <div>{question.title}</div>
                        <p>{question.assigned.completed}</p>
                        {
                          <Row
                            className="assign-container"
                            justify="space-between"
                          >
                            <p>
                              Assigned:
                              <span>
                                {question.assigned.tutor
                                  ? question?.assigned?.tutor
                                  : "No one assign yet!"}
                              </span>
                            </p>
                            <span>
                              {question.assigned.assignedAt &&
                                getTimeAgo(question?.assigned?.assignedAt)}
                            </span>
                          </Row>
                        }
                      </li>
                    )}
                  </>
                ))}
              </ul>
              {selectedThread.questions.length < 1 && (
                <p className="feedback">This Thread has not any questions</p>
              )}
              <NewThreadForm onGetEnteredValues={handleNewQuestion} />
            </>
          )}
          {!selectedThread && (
            <p className="feedback">Please Select Any thread</p>
          )}

          <h2 className="title">Completed</h2>
          {selectedThread && (
            <>
              <ul>
                {selectedThread?.questions?.map((question) => (
                  <>
                    {question.assigned.completed && (
                      <li
                        key={question.id}
                        onClick={() => handleQuestionClick(question.id)}
                      >
                        <div>{question.title}</div>
                        <p>{question.assigned.completed}</p>
                        {
                          <Row
                            className="assign-container"
                            justify="space-between"
                          >
                            <p>
                              Completed by:
                              <span>{question?.assigned?.tutor}</span>
                            </p>
                            <p>
                              Completion time:
                              <span>
                                {question?.assigned?.assignedAt &&
                                question?.assigned?.completedAt
                                  ? getTotalTimeToComplete(
                                      question?.assigned?.assignedAt,
                                      question?.assigned?.completedAt
                                    )
                                  : "Not Completed Yet"}
                              </span>
                            </p>
                          </Row>
                        }
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </>
          )}
        </Col>
        <Col span={12} className="column discussion">
          <h2 className="title">Question Discussion</h2>
          {selectedQuestion && (
            <>
              <div className="question-details">
                <h3>{selectedQuestion.title}</h3>
                <Row justify="space-between" className="question-details-time">
                  <p>
                    <span>Posted By:</span> {selectedQuestion.askedby}
                  </p>
                  <p> {getTimeAgo(selectedQuestion.askedat)}</p>
                </Row>
              </div>
              {role === "tutor" && (
                <Row className="tutor-action">
                  <Col>
                    {!selectedQuestion.assigned.assignedAt && (
                      <Button
                        type="secondary"
                        className="tutor-action-secondary"
                        onClick={assignQustionToTuturHandler}
                      >
                        Assign
                      </Button>
                    )}
                  </Col>
                  <Col>
                    {!selectedQuestion.assigned.completed ? (
                      <Button
                        className="tutor-action-primary"
                        type="primary"
                        onClick={markAsCompleteHandler}
                      >
                        Mark As Completed
                      </Button>
                    ) : (
                      "Completed"
                    )}
                  </Col>
                </Row>
              )}

              <div className="discussion-details">
                {selectedQuestion.discussion.length < 1 && (
                  <p className="feedback">
                    Please start the discussion by posting answers
                  </p>
                )}
                {selectedQuestion.discussion.map((item) => (
                  <>
                    <div key={Math.random().toString()}>
                      <p>{item.content}</p>
                      <Row
                        justify="space-between"
                        className="question-details-time"
                      >
                        <p>
                          <span>Posted By:</span> {item.reply}
                        </p>
                        <p> {getTimeAgo(item.repliedAt)}</p>
                      </Row>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
          {!selectedQuestion && (
            <p className="feedback">Please Select any question</p>
          )}
          {selectedQuestion && !selectedQuestion.assigned.completed && (
            <div className="reply-area">
              <textarea
                type="text"
                placeholder="Post your answer..."
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
              <Button type="primary" onClick={handleAnswerSubmit}>
                Post
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default DiscussionForum;
