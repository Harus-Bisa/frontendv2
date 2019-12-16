import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import {connect} from "react-redux";

function App() {
  return (
    <Router>
      <Routes/>
    </Router>
  );
}

export default connect()(App);
