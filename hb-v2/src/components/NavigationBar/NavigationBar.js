import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
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
        <Collapse isOpen={isOpen} navbar style={isOpen ? {height:'100vh'} : {}}>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <SearchBox close={toggle}/>
            </NavItem>
            {props.loggedIn && <NavItem id="logoff" onClick={props.logout}>Log Out</NavItem>}
            {!props.loggedIn && 
              <Popup
                  trigger={{
                      component:NavItem,
                      id:'login'
                  }}
                  purpose="Login"
                  content={Login}
              />
            }
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