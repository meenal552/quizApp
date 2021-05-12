import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    console.log(
      "window.localStorage.getItem " + window.localStorage.getItem("timer")
    );

    return (
      <div>
        <div className="timer" id="timer"></div>
      </div>
    );
  }
}
