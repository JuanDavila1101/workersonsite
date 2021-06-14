import React from 'react';
import PropTypes from 'prop-types';
import WorkersForm from '../components/WorkersForm';

function AddSiteView({ user, setWorkers }) {
  return (
    <>
      <div className=""></div>
      <WorkersForm
        formTitle='Add a Worker'
        user={user}
        setWorkers={setWorkers}
      />
    </>
  );
}

AddSiteView.propTypes = {
  user: PropTypes.any,
  setWorkers: PropTypes.func.isRequired
};

export default AddSiteView;
