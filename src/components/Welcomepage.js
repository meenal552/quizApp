import { Link } from "react-router-dom";
const Welcomepage = () => {
  return (
    <div class="welcome-container">
      <h1>
        <center> Welcome</center>
      </h1>

      <div class="welcome-card">
        <div class="lets-start">
          <p>Let's Start the quiz</p>
        </div>
        <Link to="/Quizpage">
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
};
export default Welcomepage;
