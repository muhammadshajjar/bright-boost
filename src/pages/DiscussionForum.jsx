import { useEffect, useState } from "react";
import "./DiscussionForum.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NewThreadForm from "../components/NewThreadForm";

const DiscussionForum = () => {
  const location = useLocation();
  const [selectedThread, setSelectedThread] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    const getThreads = async () => {
      const response = await axios.get(
        `http://localhost:3000/categories/${location.state}/threads`
      );

      setThreads(response.data);
    };
    getThreads();
  }, []);

  const handleThreadClick = (threadId) => {
    const activeThread = threads.find((thread) => thread.id === threadId);
    setSelectedThread(activeThread);
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
        `http://localhost:3000/categories/${location.state}/threads`,
        newThreadObj
      );

      setThreads((prevThreads) => {
        return [...prevThreads, response.data];
      });
      alert("NEw Thread ADDEd Successfully");
    } catch (e) {
      alert(e.message);
    }

    console.log(newThreadObj);
  };

  const handleNewQuestion = (enteredQuestion) => {
    setSelectedThread((prevThread) => ({
      ...prevThread,
      questions: [...prevThread.questions, ...enteredQuestion],
    }));
  };
  return (
    <div className="thread-view">
      <div className="column">
        <ul>
          Threads
          {threads.map((thread) => (
            <li key={thread.id} onClick={() => handleThreadClick(thread.id)}>
              {thread.title}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="New Thread Title"
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
        />
        <button onClick={handleNewThreadSubmit}>New Thread</button>
      </div>
      <div className="column">
        <ul>
          {selectedThread &&
            selectedThread.questions.map((question) => (
              <li
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
              >
                {question.title}
              </li>
            ))}
        </ul>
        <NewThreadForm onGetEnteredValues={handleNewQuestion} />
      </div>
      <div className="column">
        {selectedQuestion && (
          <div className="question-details">
            <h3>{selectedQuestion.title}</h3>
            <p>Asked by User ID: {selectedQuestion.askedby}</p>
            <p>Asked at: {selectedQuestion.askedat}</p>
            <p>Answered by: {selectedQuestion.answeredBy || "Not answered"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionForum;
