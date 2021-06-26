import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getWorkersInSite = (siteID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/workerInSite.json?orderBy="siteID"&equalTo="${siteID}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const addWorkerToSite = (workerSiteObject) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/workerInSite.json`, workerSiteObject)
    .then((response) => {
      const body = { workerInSiteID: response.data.name };
      axios.patch(`${dbURL}/workerInSite/${response.data.name}.json`, body);
    }).then(resolve)
    .catch((error) => reject(error));
});

const deleteWorkerInSite = (workerInSiteID) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/workerInSite/${workerInSiteID}.json`)
    .then(() => resolve())
    .catch((error) => reject(error));
});

const deleteAllworkersOnSite = (siteID) => new Promise((resolve, reject) => {
  getWorkersInSite(siteID).then((workersInSiteArray) => {
    const deleteAllWorkers = workersInSiteArray.map((currentWorkerInSite) => deleteWorkerInSite(currentWorkerInSite.workerInSiteID));
    Promise.all(deleteAllWorkers).then((error) => reject(error));
  }).catch((error) => reject(error));
});

export {
  getWorkersInSite, addWorkerToSite, deleteAllworkersOnSite, deleteWorkerInSite
};
