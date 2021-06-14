import React from 'react';
// import firebase from 'firebase';
import PropTypes from 'prop-types';
import SitesForm from '../components/SitesForm';

function AddSiteView({ user, setSites }) {
  return (
    <>
      <div className=""></div>
      <SitesForm
        formTitle='Add a Site'
        setSites={setSites}
        user={user}
      />
    </>
  );
}

AddSiteView.propTypes = {
  user: PropTypes.any,
  setSites: PropTypes.func.isRequired
};

export default AddSiteView;
