import React from 'react';
import {
  Navbar
} from 'reactstrap';

function Header() {
  return (
    <>
    <div className="navbar-header">
      <Navbar color='light' light expand="md">
        <h3 >Workers Site</h3>
      </Navbar>
    </div>
   </>
  );
}

export default Header;
