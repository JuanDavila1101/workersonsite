import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
        <Link className="nav-link" to="/sites"> Sites </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/workers"> Workers </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/sites-form"> Sites Form </Link>
      </NavItem>
      <NavItem>
        <Link className="nav-link" to="/workers-form"> Workers Form </Link>
      </NavItem>
    </>
  );

  return (
    <div className='nav-container'>
      <Navbar color='light' light expand="md">
          <Link className="navbar-home" to="/"> Home </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="nav-link" navbar>
          <Nav className="mr-auto" navbar>
            {user && authenticated()}
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
