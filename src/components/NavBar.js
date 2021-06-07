import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse, Navbar, NavbarToggler, Nav, NavItem, Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/data/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <>
      <NavItem>
        <h3 className="nav-link">Sites</h3>
      </NavItem>
      <NavItem>
        <h3 className="nav-link">Workers</h3>
      </NavItem>
    </>
  );

  return (
    <div className='nav-container'>
      <Navbar color='light' light expand="md">
        <h3 className="navbar-home">Home</h3>
        <h3 className="navbar-sites">Sites</h3>
        <h3 className="navbar-workers">Workers</h3>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user && authenticated()}
            <NavItem>
              {
                user !== null
                && <NavItem>
                     {
                       user
                         ? <Button color='secondary' onClick={signOutUser}>Sign Out</Button>
                         : <Button color='info' onClick={signInUser}>Sign In</Button>
                     }
                   </NavItem>
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
