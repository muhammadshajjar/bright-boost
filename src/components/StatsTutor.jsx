import "./StatsTutor.css";

const StatsTutor = ({ tutor }) => {
  return (
    <>
      <div className="avaliable-tutor">
        <p>
          {tutor?.firstname} {tutor.lastname}
        </p>
        <ul className="skills">
          {tutor?.expertiseArea?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StatsTutor;
