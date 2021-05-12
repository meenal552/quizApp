import React, { Component } from "react";

import { fetchMcqs } from "../actions/mcqAction";
import { connect } from "react-redux";
import Navbar from "./Navbar.js";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class Quizpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Date.now(),
      question: 1,
      answers: [],
      timeroff: false,
    };

    this.isOptionSelected = this.isOptionSelected.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  componentWillMount() {
    this.props.fetchMcqs(this.state.question);
  }

  componentWillUnmount() {
    window.sessionStorage.clear();
  }
  componentDidMount() {
    let sec = parseInt(window.sessionStorage.getItem("seconds"));
    let min = parseInt(window.sessionStorage.getItem("minutes"));

    if (parseInt(min * sec)) {
      var fiveMinutes = parseInt(min * 60) + sec;
    } else {
      fiveMinutes = 60 * 20;
    }

    // let display = document.querySelector("#timer");
    this.startTimer(fiveMinutes, document.querySelector("#timer"));

    this.props.fetchMcqs(this.state.question);
  }

  startTimer(duration, display) {
    var timer = duration,
      minutes,
      seconds;
    const xyz = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        // timer = duration;
        clearInterval(xyz);
      }

      if (display.textContent === "00:00") {
        return;
      }
      // console.log(parseInt(seconds));
      window.sessionStorage.setItem("seconds", seconds);
      window.sessionStorage.setItem("minutes", minutes);
    }, 1000);
  }

  updateState = () => {
    this.setState({
      timeroff: true,
    });
  };
  previousQuestion = () => {
    if (this.isOneChecked) {
      const { question } = this.state;
      const { fetchMcqs } = this.props;
      if (question === 1) {
      } else {
        this.setState(
          {
            question: question - 1,
          },
          fetchMcqs(question - 1)
        );
      }
    }
  };

  nextQuestion = () => {
    if (this.isOneChecked()) {
      if (this.state.question === 5) {
      } else {
        this.setState(
          {
            question: this.state.question + 1,
          },
          this.props.fetchMcqs(this.state.question + 1)
        );
      }
      // console.log("next " + this.state.question + 1);
    }
  };
  isOneChecked = () => {
    console.log("os one check ");
    var chx = document.getElementsByTagName("input");
    for (var i = 0; i < chx.length; i++) {
      if (chx[i].type === "radio" && chx[i].checked) {
        window.localStorage.setItem(this.state.question, i);
        return true;
      }
    }
    alert("Select one option!");
    return false;
  };

  isOptionSelected(e) {
    // console.log("ansers " + this.state.answers[this.state.question]);
    if (this.state.answers[this.state.question] === e.target.value) return true;
    return false;
  }

  onChangeValue(event) {
    console.log("target value " + event.target.value);
    let temp = this.state.answers;
    temp[this.state.question - 1] = event.target.value;

    this.setState({
      answers: temp,
    });
    // event.target.setAttribute("checked", "");

    console.log("answers " + this.state.answers);
  }
  render() {
    const { question } = this.state;

    return (
      <div>
        {this.state.timeroff ? <Redirect to="/thankyou" /> : <div></div>}

        <Navbar
          timer={this.state.timer}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
        />

        <div className="question-container">
          <div className="questions">
            <span>Q{this.props.tasks.id}.</span>
            <p> {this.props.tasks.question}</p>
          </div>
          <div className="options-container" onChange={this.onChangeValue}>
            <div className="options">
              <input
                type="radio"
                name="group"
                value="1"
                // onClick={this.handleClick.bind(this)}
                // checked={false}
              />
              <label for="option1">{this.props.tasks.option1}</label>
            </div>
            <div className="options">
              <input
                type="radio"
                name="group"
                value="2"
                // onClick={this.handleClick.bind(this)}
                // checked={false}
              />
              <label for="option2">{this.props.tasks.option2}</label>
            </div>
            <div className="options">
              <input
                type="radio"
                name="group"
                value="3"
                // onClick={this.handleClick.bind(this)}
                // checked={false}
              />
              <label for="option3">{this.props.tasks.option3}</label>
            </div>
            <div className="options">
              <input
                type="radio"
                name="group"
                value="4"
                // onClick={this.handleClick.bind(this)}
                // checked={false}
              />
              <label for="option4">{this.props.tasks.option4}</label>
            </div>
          </div>
        </div>

        <div class="button-container">
          <button class="backfront" onClick={this.previousQuestion}>
            Back
          </button>
          <button class="backfront" onClick={this.nextQuestion}>
            next
          </button>
          {question === 5 ? (
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
