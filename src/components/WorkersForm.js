import React, { useState } from 'react';
import {
  FormGroup, Form, Label, Input, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addWorker, updateWorker } from '../helpers/data/workersData';

const WorkerForm = ({
  formTitle,
  setWorkers,
  user,
  workerID,
  workerName,
  workerPicture,
  creatorID,
}) => {
  const [worker, setWorker] = useState({
    workerID: workerID || null,
    workerName: workerName || '',
    workerPicture: workerPicture || '',
    creatorID: creatorID || user ? user.uid : '',
  });

  const handleInputChange = (e) => {
    setWorker((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      creatorID: user ? user.uid : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (worker.workerID) {
      updateWorker(worker, user.uid).then((workersArray) => setWorkers(workersArray));
    } else {
      addWorker(worker, user.uid).then((workersArray) => setWorkers(workersArray));
    }

    setWorker({
      workerID: null,
      workerName: '',
      workerAddress: '',
      workerPicture: '',
      creatorID: '',
    });
  };

  return (
    <>
      <div className='worker-form'>
        <Form id='add-worker-form' autoComplete='off' onSubmit={handleSubmit}>
          <h2>{formTitle}</h2>
          <FormGroup>
            <Label>Worker Name</Label>
            <Input
              name='workerName'
              id='workerName'
              type='text'
              placeholder='Worker Name'
              value={worker.workerName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Worker Picture URL</Label>
            <Input
              name='workerPicture'
              id='workerPicture'
              type='text'
              placeholder='Worker Picture URL'
              value={worker.workerPicture}
              onChange={handleInputChange}
            />
          </FormGroup>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </>
  );
};

WorkerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setWorkers: PropTypes.func,
  user: PropTypes.any,
  workerID: PropTypes.string,
  workerName: PropTypes.string,
  workerPicture: PropTypes.string,
  creatorID: PropTypes.string
};

export default WorkerForm;
