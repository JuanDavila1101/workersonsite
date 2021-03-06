import axios from 'axios';
import firebaseConfig from '../apiKeys';
import { addWorkerToSite } from './WorkerInSiteData';

const dbURL = firebaseConfig.databaseURL;

const getSites = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/sites.json?orderBy="creatorID"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const addSite = (siteObject, uid, workersInSiteChanges) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/sites.json`, siteObject)
    .then((response) => {
      const body = { siteID: response.data.name };

      const addingWorkersToSite = workersInSiteChanges.map((workerinfo) => addWorkerToSite({ ...workerinfo, siteID: response.data.name }));
      const patchingTheNewSite = axios.patch(`${dbURL}/sites/${response.data.name}.json`, body);

      Promise.all([addingWorkersToSite, patchingTheNewSite])
        .then(() => {
          getSites(uid).then((sitesArray) => resolve(sitesArray));
        });
    }).catch((error) => reject(error));
});

const deleteSite = (siteID, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/sites/${siteID}.json`)
    .then(() => {
      getSites(uid).then((sitesArray) => resolve(sitesArray));
    })
    .catch((error) => reject(error));
});

const updateSite = (siteObject, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/sites/${siteObject.siteID}.json`, siteObject)
    .then(() => {
      getSites(uid).then((sitesArray) => resolve(sitesArray));
    })
    .catch((error) => reject(error));
});

const getSingleSite = (siteID) => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/sites/${siteID}.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getSites, addSite, deleteSite, updateSite, getSingleSite
};
