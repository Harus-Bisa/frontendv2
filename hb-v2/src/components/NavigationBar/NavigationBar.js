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
import { withRouter, Link } from 'react-router-dom';
import { Search } from '@material-ui/icons';
import { ButtonBase } from '@material-ui/core';
import SearchBoxPopup from '../Popup/SearchBoxPopup';

function NavigationBar(props){
  const [isOpen, setIsOpen] = useState(false);
  const [navBackground, setNavBackground] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false);

  const navRef = React.useRef()
  navRef.current = navBackground
  const history = props.history
  React.useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 0
      if (navRef.current !== show) {
        setNavBackground(show)
      }
    }
    document.addEventListener('scroll', handleScroll)

    const unlisten = history.listen((location, action) => {
      setShowSearchBox(false)
    })
    return () => {
      document.removeEventListener('scroll', handleScroll)
      unlisten();
    }
  }, [history])

  const toggle = () => {
    if(isOpen){
      setShowSearchBox(false)
    }
    setIsOpen(!isOpen)
  };
  const SignUp = (props) =>{
    return(<SignUpPopup collapseNavbar={() => setIsOpen(false)} closePopup={props.closePopup}/>)
  }
  const DummyMobileSearchBox = (props)=>{
    return(
      <ButtonBase 
        onClick={() => {
          props.onClick()
          setIsOpen(false)
        }}
      >
        <NavLink style={{color:'black'}}>
          <Search/> Cari Dosen Anda
        </NavLink>
      </ButtonBase>
    )
  }
  
  const logout = () =>{
    props.logout()
    setIsOpen(false)
    props.history.push("/")
  }
  const loggedIn = props.loggedIn
  const email = props.email
  const getUser = props.getUser
  React.useEffect(() =>{
    if(loggedIn && !email){
      getUser(localStorage.getItem("userId"))
    }
  }, [loggedIn, email, getUser])

  const atLanding = props.location.pathname === "/"
  const navlinkClassname = atLanding ? "contrast-navlink dark-navlink navlink" : "contrast-navlink navlink"
  const textColor = isOpen || !atLanding || navBackground ? "rgba(0,0,0,.9)":"white";
  
  return(
    <div>
      <Navbar light expand="md" className={isOpen ? "navbar full-height" : "navbar"} style={{backgroundColor:(isOpen || !atLanding || navBackground  ? "white" : "transparent"), height:"75px"}}>
        <Link to="/" style={{marginBottom:'0'}}><NavbarBrand className="brand" style={{color:textColor}}>Dosen Ku</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className={isOpen ? "justify-content-end full-height" : "justify-content-end"}>
        {!props.isMobile &&  
          <Nav navbar className="navbar-width" style={{height:"36px"}}>          
            {props.loggedIn && props.email && !showSearchBox && 
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {props.email}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink id="logoff" onClick={logout}>Log Out</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            }
            {(!props.loggedIn && !showSearchBox) && 
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
            {showSearchBox &&   
              <NavItem style={{width:'100%'}}>
                <SearchBox 
                  close={() => {
                    setIsOpen(false)
                    setShowSearchBox(false)
                  }}
                  type={atLanding ? "dark" : "normal"}
                />
              </NavItem>
            }
            {!showSearchBox && 
            <NavItem>
              <ButtonBase onClick={() => setShowSearchBox(true)}><NavLink className={navlinkClassname}><Search style={{fontSize:'14px'}}/></NavLink></ButtonBase>
            </NavItem>}
          </Nav>
        }
        {
          props.isMobile &&
          <Nav navbar className="navbar-width">          
            <NavItem style={{paddingTop:'4rem', paddingBottom:'3rem'}}>
              <Popup
                  trigger={{
                      component:DummyMobileSearchBox
                  }}
                  content={SearchBoxPopup}
              />
            </NavItem>
            {props.loggedIn && props.email && !showSearchBox && 
              <React.Fragment>
                <NavItem>
                  <NavLink className="navbar-full-width" style={{color:"black"}}>{props.email}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink id="logoff" onClick={logout} className="navbar-full-width" style={{color:"black", backgroundColor:"#F1F1F1"}}>Log Out</NavLink>
                </NavItem>
              </React.Fragment>
            }
            {(!props.loggedIn && !showSearchBox) && 
            <React.Fragment>
              <NavItem>
                <Popup
                    trigger={{
                        component:NavLink,
                        id:'login',
                        style:{color:"black", backgroundColor:"#F1F1F1"},
                        className:"navbar-full-width"
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
                      style:{backgroundColor:"var(--hb-blue)", color:'white'},
                      className:"navbar-full-width"
                  }}
                  purpose="Sign Up"
                  content={SignUp}
                />
              </NavItem>
            </React.Fragment>
            }
          </Nav>
        }
        </Collapse>
      </Navbar>
    </div>
  );
}

function mapStateToProps(state){
  return{
    loggedIn: state.loggedIn,
    email: state.user? state.user.email : null,
    isMobile: state.isMobile
  }
}
export default connect(mapStateToProps, {logout, getUser})(withRouter(NavigationBar));