import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Thankyoupage from "./Thankyoupage";
import { Redirect } from "react-router";

export default class Navbar extends Component {
  state = {
    redirect: null,
  };
  setTime = () => {
    this.setState({ redirect: "/thankyoupage" });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const timerProps = {
      isPlaying: true,
      size: 120,
      strokeWidth: 6,
    };
    const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 300; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    const renderTime = (dimension, time) => {
      return (
        <div className="time-wrapper">
          <div className="time">{time}</div>
          <div>{dimension}</div>
        </div>
      );
    };

    return (
      <div>
        {remainingTime ? (
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <div className="timer">
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#EF798A"]]}
                duration={hourSeconds}
                size="85"
                strokeWidth="2"
                trailStrokeWidth="2"
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={() => [false]}
              >
                {({ elapsedTime }) =>
                  renderTime("min", getTimeMinutes(hourSeconds - elapsedTime))
                }
              </CountdownCircleTimer>
              <div style={{ width: "2rem" }}></div>
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#218380"]]}
                strokeWidth="2"
                trailStrokeWidth="2"
                size="85"
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => [
                  remainingTime - totalElapsedTime > 0,
                ]}
              >
                {({ elapsedTime }) =>
                  renderTime("sec", getTimeSeconds(elapsedTime))
                }
              </CountdownCircleTimer>
            </div>
          </nav>
        ) : (
          <Thankyoupage />
        )}
      </div>
    );
  }
}
/*
import React, { Component } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Thankyoupage from "./Thankyoupage";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    const minuteSeconds = 60;
    const hourSeconds = 3600;
    const timerProps = {
      isPlaying: true,
      size: 120,
      strokeWidth: 6,
    };
    const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
    const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 600; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    const renderTime = (dimension, time) => {
      return (
        <div className="time-wrapper">
          <div className="time">{time}</div>
          <div>{dimension}</div>
        </div>
      );
    };
    return (
      <div>
        {remainingTime ? (
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <div className="timer">
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#EF798A"]]}
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => [
                  remainingTime - totalElapsedTime > minuteSeconds,
                ]}
              >
                {({ elapsedTime }) =>
                  renderTime(
                    "minutes",
                    getTimeMinutes(hourSeconds - elapsedTime)
                  )
                }
              </CountdownCircleTimer>
              <CountdownCircleTimer
                {...timerProps}
                colors={[["#218380"]]}
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => [
                  remainingTime - totalElapsedTime > 0,
                ]}
              >
                {({ elapsedTime }) =>
                  renderTime("seconds", getTimeSeconds(elapsedTime))
                }
              </CountdownCircleTimer>
            </div>
          </nav>
        ) : (
          <Thankyoupage />
        )}
      </div>
    );
  }
}
 */
