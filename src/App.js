import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Welcomepage from "./components/Welcomepage.js";
import Quizpage from "./components/Quizpage.js";
import Thankyoupage from "./components/Thankyoupage.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" exact component={Welcomepage} />
          <Route path="/Quizpage" exact component={Quizpage} />
          <Route path="/thankyou" exact component={Thankyoupage} />
        </Router>
      </Provider>
    );
  }
}

export default App;
