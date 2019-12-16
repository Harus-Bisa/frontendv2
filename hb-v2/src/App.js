import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/index.css";
import NavigationBar from './components/NavigationBar/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar/>
      <Routes/>
    </Router>
  );
}

export default connect()(App);
