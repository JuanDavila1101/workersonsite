import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Button, Card, CardTitle, CardBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteWorker } from '../helpers/data/workersData';
import WorkerForm from './WorkersForm';

const WorkerCard = ({
  setWorkers,
  user,
  workerID,
  workerName,
  workerPicture,
  creatorID,
}) => {
  const [editing, setEditing] = useState(false);
  // const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteWorker(workerID, user.uid).then((workersArray) => setWorkers(workersArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('default');
    }
  };

  return (
    <Card style={{ width: '20rem' }}>
      <CardBody>
        <CardTitle tag="h5">Worker: {workerName}</CardTitle>
      </CardBody>
      <img width="100%" src={workerPicture} alt="Worker Image"/>
      <CardBody>
       <div className="button-container">
        <Button
          color="success"
          onClick={() => handleClick('edit')}
           size="sm">
          {editing ? 'Close Form' : 'Edit Worker'}
        </Button>
        <Button
          color="danger"
          onClick={() => handleClick('delete')}
          size="sm">Delete this Worker</Button>
          {editing && <WorkerForm
                        formTitle='Edit Worker'
                        setWorkers={setWorkers}
                        user={user}
                        workerID={workerID}
                        workerName={workerName}
                        workerPicture={workerPicture}
                        creatorID={creatorID}
                        onEditMode={true}
                      />
          }
       </div>
      </CardBody>
    </Card>
  );
};

WorkerCard.propTypes = {
  setWorkers: PropTypes.func,
  user: PropTypes.any,
  workerID: PropTypes.string.isRequired,
  workerName: PropTypes.string.isRequired,
  workerPicture: PropTypes.string.isRequired,
  creatorID: PropTypes.string
};

export default WorkerCard;
