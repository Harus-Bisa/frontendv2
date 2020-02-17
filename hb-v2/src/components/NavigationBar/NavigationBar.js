import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem
} from 'reactstrap';
import SearchBox from "../SearchBox/SearchBox";
import { connect } from 'react-redux';
import { logout, getUser } from '../../redux/actions';
import Popup from '../Popup/Popup';
import LoginPopup from '../Popup/LoginPopup';
import SignUpPopup from '../Popup/SignupPopup';
import { withRouter } from 'react-router-dom';
import { Search } from '@material-ui/icons';

function NavigationBar(props){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const SignUp = (props) =>{
    return(<SignUpPopup collapseNavbar={() => setIsOpen(false)} closePopup={props.closePopup}/>)
  }
  const logout = () =>{
    props.logout()
    setIsOpen(false)
    props.history.push("/")
  }
  const loggedIn = props.loggedIn
  const name = props.name
  const getUser = props.getUser
  React.useEffect(() =>{
    if(loggedIn && !name){
      getUser(localStorage.getItem("userId"))
    }
  }, [loggedIn, name, getUser])

  const atLanding = props.location.pathname === "/"
  const navlinkClassname = atLanding ? "contrast-navlink dark-navlink navlink" : "contrast-navlink navlink"
  const textColor = atLanding && !isOpen ? "white":"inherit";
  
  return(
    <div>
      <Navbar light expand="md" className="navbar" style={{backgroundColor:(isOpen || !atLanding  ? "white" : "transparent")}}>
        <NavbarBrand href="/" className="brand" style={{color:textColor}}>Dosen Ku</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className={isOpen ? "justify-content-end full-height" : "justify-content-end"}>
          <Nav navbar>
            <div className="d-md-none">
              <NavItem>
                <SearchBox close={toggle}/>
              </NavItem>
            </div>
            {props.loggedIn && props.name &&
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Hello, {props.name}!
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink id="logoff" onClick={logout}>Log Out</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
            {!props.loggedIn && 
            <React.Fragment>
              <NavItem>
                <Popup
                    trigger={{
                        component:NavLink,
                        id:'login',
                        style:{color:textColor}
                    }}
                    purpose="Login"
                    content={LoginPopup}
                />
              </NavItem>
              <NavItem>
                <Popup
                  trigger={{
                      component:NavLink,
                      id:'signup',
                      className:navlinkClassname
                  }}
                  purpose="Sign Up"
                  content={SignUp}
                />
              </NavItem>
            </React.Fragment>
            }
            <NavItem>
              <NavLink className={navlinkClassname}><Search style={{fontSize:'14px'}}/></NavLink>
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
export default connect(mapStateToProps, {logout, getUser})(withRouter(NavigationBar));