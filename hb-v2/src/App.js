import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import {connect} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/index.css";
import NavigationBar from './components/NavigationBar/NavigationBar';
import { changeIsMobile } from './redux/actions';

function App(props) {
  const changeIsMobile = props.changeIsMobile
  React.useEffect(() => {
    const handleResize = () => {
      changeIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [changeIsMobile])
  return (
    <Router>
      <NavigationBar/>
      <Routes/>
    </Router>
  );
}

export default connect(null, {changeIsMobile})(App);
