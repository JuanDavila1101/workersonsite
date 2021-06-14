import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getWorkersInSite = (siteID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/workerInSite.json?orderBy="siteID"&equalTo="${siteID}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addWorkerToSite = (workerSiteObject, siteID) => new Promise((resolve, reject) => {
  const workerSiteObjectTemp = ({ ...workerSiteObject, siteID });
  debugger;
  axios.post(`${dbURL}/workerInSite.json`, workerSiteObjectTemp)
    .then(() => resolve())
    .catch((error) => reject(error));
});

const deleteworkerOnSite = (siteID, workerID) => new Promise((resolve, reject) => {
  console.warn(`${dbURL}/workerInSite.json?orderBy="workerID"&equalTo="${workerID}"&orderBy="siteID"&equalTo="${siteID}"`);
  debugger;
  axios.delete(`${dbURL}/workerInSite.json?orderBy="workerID"&equalTo="${workerID}"&orderBy="siteID"&equalTo="${siteID}"`)
    .then(() => resolve())
    .catch((error) => reject(error));
});

export { getWorkersInSite, addWorkerToSite, deleteworkerOnSite };
