import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import SearchBox from "../SearchBox/SearchBox";
import { connect } from 'react-redux';
import { logout, getUser } from '../../redux/actions';
import Popup from '../Popup/Popup';
import LoginPopup from '../Popup/LoginPopup';
import SignUpPopup from '../Popup/SignupPopup';

function NavigationBar(props){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const SignUp = (props) =>{
    return(<SignUpPopup collapseNavbar={() => setIsOpen(false)} closePopup={props.closePopup}/>)
  }
  const loggedIn = props.loggedIn
  const name = props.name
  const getUser = props.getUser
  React.useEffect(() =>{
    if(loggedIn && !name){
      getUser(localStorage.getItem("userId"))
    }
  }, [loggedIn, name, getUser])
  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/">Harus Bisa</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar style={isOpen ? {height:'100vh'} : {}} className="justify-content-end">
          <Nav navbar>
            <div class="d-md-none">
              <NavItem>
                <SearchBox close={toggle}/>
              </NavItem>
            </div>
            <NavItem>
            {props.loggedIn && props.name && <NavLink id="name" onClick={() => {}}>Hello, {props.name}!</NavLink>}
            {!props.loggedIn && 
              <Popup
                  trigger={{
                      component:NavLink,
                      id:'login'
                  }}
                  purpose="Login"
                  content={LoginPopup}
              />
            }
            </NavItem>
            <NavItem>
              {props.loggedIn && <NavLink id="logoff" onClick={props.logout}>Log Out</NavLink>}
              {!props.loggedIn &&
                <Popup
                  trigger={{
                      component:NavLink,
                      id:'signup'
                  }}
                  purpose="Sign Up"
                  content={SignUp}
                />
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

function mapStateToProps(state){
  return{
    loggedIn: state.loggedIn,
    name: state.user? state.user.name : null
  }
}
export default connect(mapStateToProps, {logout, getUser})(NavigationBar);