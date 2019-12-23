import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import SearchBox from "../SearchBox/SearchBox";

function NavigationBar(props){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" style={{backgroundColor:'white', position:'sticky', top:0, zIndex:999}}>
        <NavbarBrand href="/">Harus Bisa</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar style={isOpen ? {height:'100vh'} : {}}>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <SearchBox close={toggle}/>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;