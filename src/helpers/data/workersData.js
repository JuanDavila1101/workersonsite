import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getWorkers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/workers.json?orderBy="creatorID"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const addWorker = (workerObject, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/workers.json`, workerObject)
    .then((response) => {
      const body = { workerID: response.data.name };
      axios.patch(`${dbURL}/workers/${response.data.name}.json`, body)
        .then(() => {
          getWorkers(uid).then((workersArray) => resolve(workersArray));
        });
    }).catch((error) => reject(error));
});

const deleteWorker = (workerID, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/workers/${workerID}.json`)
    .then(() => {
      getWorkers(uid).then((workersArray) => resolve(workersArray));
    })
    .catch((error) => reject(error));
});

const updateWorker = (workerObject, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/workers/${workerObject.workerID}.json`, workerObject)
    .then(() => {
      getWorkers(uid).then((workersArray) => resolve(workersArray));
    })
    .catch((error) => reject(error));
});

const getSingleWorker = (workerID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/workers/${workerID}.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getWorkers, addWorker, deleteWorker, updateWorker, getSingleWorker
};
