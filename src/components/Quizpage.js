import React, { Component } from "react";
import { useState, useEffect } from "react";
import { fetchMcqs } from "../actions/mcqAction";
import { connect } from "react-redux";
import Navbar from "./Navbar.js";

import { Link } from "react-router-dom";

class Quizpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now(),
      question: 1,
    };
  }
  componentWillMount() {
    // console.log("wee " + this.state.question);

    this.props.fetchMcqs(this.state.question);
  }
  componentWillUpdate(nextProps, nextState) {
    // localStorage.setItem("timer", JSON.stringify(nextState));
    // console.log("timer " + this.timer);
    // var data = localStorage.getItem("timer");
    // console.log("data " + data);
    // this.props.fetchMcqs(this.state.question);
  }
  componentDidMount() {
    // this.timer = JSON.parse(localStorage.getItem("timer"));
    // if (localStorage.getItem("timer")) {
    //   this.setState({
    //     timer: this.timer,
    //   });
    // }
    this.props.fetchMcqs(this.state.question);
  }

  // const [currentQuestion, setcurrentQuestion] = useState([]);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     const tasksFromServer = await fetchTasks();
  //     setTasks(tasksFromServer);
  //   };

  //   getTasks();
  // }, []);

  // // Fetch Tasks
  // const fetchTasks = async () => {
  //   const res = await fetch("http://localhost:5000/mcq");
  //   const data = await res.json();

  //   return data;
  // };

  // // Fetch Task
  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/mcq/${id}`);
  //   const data = await res.json();
  //   console.log("id is  " + id + " data is " + data);
  //   return data;
  // };

  // const showquestion = fetchTask(currentQuestion);
  // console.log("show question  " + showquestion.id);
  previousQuestion = () => {
    const { question } = this.state;
    const { fetchMcqs } = this.props;
    if (question == 1) {
    } else {
      this.setState(
        {
          question: question - 1,
        },
        fetchMcqs(question - 1)
      );
    }
  };
  fetching = () => {
    this.props.fetchMcqs(this.state.question);
  };
  nextQuestion = () => {
    if (this.state.question == 5) {
    } else {
      this.setState(
        {
          question: this.state.question + 1,
        },
        this.props.fetchMcqs(this.state.question + 1)
      );
      // this.props.fetchMcqs(this.state.question);
    }
    console.log("next " + this.state.question + 1);
  };
  render() {
    // const question = this.props.tasks.map((task) => (
    //   <h3>hello {task.question}</h3>
    // ));
    const { question } = this.state;

    return (
      <div>
        <Navbar timer={this.state.timer} />
        {/* <h3>hello {tasks[0].question}</h3> */}
        <div className="question-container">
          <div className="questions">
            <span>Q{this.props.tasks.id}.</span>
            <p> {this.props.tasks.question}</p>
          </div>
          <div className="options">
            <input type="radio" />
            <label for="option1">{this.props.tasks.option1}</label>
          </div>
          <div className="options">
            <input type="radio" />
            <label for="option2">{this.props.tasks.option2}</label>
          </div>
          <div className="options">
            <input type="radio" />
            <label for="option3">{this.props.tasks.option3}</label>
          </div>
          <div className="options">
            <input type="radio" />
            <label for="option4">{this.props.tasks.option4}</label>
          </div>
        </div>

        <div class="button-container">
          <button class="backfront" onClick={this.previousQuestion}>
            Back
          </button>
          <button class="backfront" onClick={this.nextQuestion}>
            next
          </button>
          {question == 5 ? (
            <Link to="/thankyou">
              <button
                class="backfront"
                style={{ backgroundColor: "lightblue", color: "black" }}
              >
                Submit
              </button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  tasks: state.mcqs.item,
  id: ownProps,
});
export default connect(mapStateToProps, { fetchMcqs })(Quizpage);
