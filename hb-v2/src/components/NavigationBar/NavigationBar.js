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
import { logout } from '../../redux/actions';
import Popup from '../Popup/Popup';
import Login from '../../pages/Login/Login';

function NavigationBar(props){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand href="/">Harus Bisa</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar style={isOpen ? {height:'100vh'} : {}} className="justify-content-end">
          <Nav navbar>
            <NavItem>
              <SearchBox close={toggle}/>
            </NavItem>
            <NavItem>
            {props.loggedIn && <NavLink id="logoff" onClick={props.logout}>Log Out</NavLink>}
            {!props.loggedIn && 
              <Popup
                  trigger={{
                      component:NavLink,
                      id:'login'
                  }}
                  purpose="Login"
                  content={Login}
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
    loggedIn: state.loggedIn
  }
}
export default connect(mapStateToProps, {logout})(NavigationBar);