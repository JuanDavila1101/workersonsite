import React from 'react';
import PropTypes from 'prop-types';
import WorkerCard from '../components/WorkerCard';

function WorkersView({ workers, setWorkers, user }) {
  return (
    <>
      <div className="workers-container">
        {
          workers.map((workerInformation) => (
            <WorkerCard
              key={workerInformation.workerID}
              setWorkers={setWorkers}
              user={user}
              workerID={workerInformation.workerID}
              workerName={workerInformation.workerName}
              workerPicture={workerInformation.workerPicture}
              creatorID={workerInformation.creatorID}
            />
          ))
        }
      </div>
    </>
  );
}

WorkersView.propTypes = {
  workers: PropTypes.array.isRequired,
  setWorkers: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired
};

export default WorkersView;
