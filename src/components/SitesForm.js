import React, { useState, useEffect } from 'react';
import {
  FormGroup, Form, Label, Input, Button, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addSite, updateSite } from '../helpers/data/sitesData';
import { getWorkers } from '../helpers/data/workersData';
import { getWorkersInSite } from '../helpers/data/WorkerInSiteData';
// import { Dropdown } from 'bootstrap';

const SiteForm = ({
  formTitle,
  setSites,
  user,
  siteID,
  siteName,
  siteAddress,
  sitePicture,
  siteDescription,
  isJobFinished,
  creatorID,
}) => {
  const [site, setSite] = useState({
    siteID: siteID || null,
    siteName: siteName || '',
    siteAddress: siteAddress || '',
    sitePicture: sitePicture || '',
    siteDescription: siteDescription || '',
    isJobFinished: isJobFinished || false,
    creatorID: creatorID || user ? user.uid : '',
  });

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [allWorkers, setAllWorkers] = useState([]);
  const [storedWorkersIDsOnSite, setStoredWorkersIDsOnSite] = useState([]);
  // const [workersInSiteChanges, setWorkersInSiteChanges] = useState([]);
  const workersInSiteChanges = [];
  const [newSiteID, setNewSiteID] = useState('');

  // getWorkers(user ? user.uid : '').then((workersArray) => setAllWorkers(workersArray));
  // getWorkersInSite(site.siteID).then((selectedWorkersArray) => setStoredWorkersIDsOnSite(selectedWorkersArray));

  useEffect(() => {
    getWorkers(user ? user.uid : '').then((workersArray) => setAllWorkers(workersArray));
    getWorkersInSite(site.siteID).then((selectedWorkersArray) => setStoredWorkersIDsOnSite(selectedWorkersArray));
  }, []);

  const handleSelectedWorkers = (selectedWorkerID) => {
    console.warn(selectedWorkerID);
    console.warn(storedWorkersIDsOnSite);
    console.warn(storedWorkersIDsOnSite.includes(selectedWorkerID));
    console.warn(allWorkers.includes({ workerID: `${selectedWorkerID}` }));
    // console.warn(allWorkers.workerID.findIndex(selectedWorkerID));
    console.warn(allWorkers.find((x) => x.workerID === selectedWorkerID));
    console.warn(allWorkers.find((x) => x.workerID === selectedWorkerID));

    const temp = allWorkers.find((x) => x.workerID === selectedWorkerID);
    console.warn(temp);

    const isWorkerOnSite = (allWorkers.find((x) => x.workerID === selectedWorkerID));
    console.warn(isWorkerOnSite);

    const isWorkerOnSite0 = (storedWorkersIDsOnSite.find((x) => x.workerID === selectedWorkerID) === null ? 'true' : 'false');
    console.warn(isWorkerOnSite0);

    console.warn(allWorkers);

    if (isWorkerOnSite0 === 'false') {
      const obj = { siteID: null, workerID: selectedWorkerID };
      workersInSiteChanges.push(obj);
      console.warn(workersInSiteChanges);
    }
    console.warn(workersInSiteChanges);
    debugger;
  };

  const handleInputChange = (e) => {
    setSite((prevState) => ({
      ...prevState,
      [e.target.name]: (e.target.name !== 'isJobFinished' ? e.target.value : e.target.checked),
      creatorID: user ? user.uid : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (site.siteID) {
      updateSite(site, creatorID).then((sitesArray) => setSites(sitesArray));
    } else {
      // addSite(site, user.uid).then((sitesArray) => setSites(sitesArray));
      // addSite(site, user.uid, workersInSiteChanges).then((sitesArray) => setSites(sitesArray));
      addSite(site).then((newSiteFirebaseKey) => setNewSiteID(newSiteFirebaseKey));
      // workersInSiteChanges.forEach((tempWorker) => {addWorkerToSite(tempWorker);});
      console.warn(newSiteID);
      debugger;
    }

    setSite({
      siteID: null,
      siteName: '',
      siteAddress: '',
      sitePicture: '',
      siteDescription: '',
      isJobFinished: '',
      creatorID: '',
    });
  };

  return (
    <>
      <div className='site-form'>
        <Form id='add-site-form' autoComplete='off' onSubmit={handleSubmit}>
          <h2>{formTitle}</h2>
          <FormGroup>
            <Label>Site Name</Label>
            <Input
              name='siteName'
              id='siteName'
              type='text'
              placeholder='Site Name'
              value={site.siteName}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Site Address</Label>
            <Input
              name='siteAddress'
              id='siteAddress'
              type='text'
              placeholder='Site Address'
              value={site.siteAddress}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Site Picture URL</Label>
            <Input
              name='sitePicture'
              id='sitePicture'
              type='text'
              placeholder='Site Picture URL'
              value={site.sitePicture}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Site Description</Label>
            <Input
              name='siteDescription'
              id='siteDescription'
              type='text'
              placeholder='Site Description'
              value={site.siteDescription}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Is the Job Site Finished</Label>
            <Input
              name='isJobFinished'
              id='isJobFinished'
              type='checkbox'
              value={site.isJobFinished}
              onChange={handleInputChange}
            />
          </FormGroup>

          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Small Button
            </DropdownToggle>
            <DropdownMenu>
              {allWorkers.map((workerInfo) => <DropdownItem
                                                 key={workerInfo.workerID}
                                                 id={workerInfo.workerID}
                                                 toggle={false}>
                <FormGroup
                   onClick={handleSelectedWorkers(workerInfo.workerID)} >
                  <Label check>
                    <Input
                       name='isWorkerChecked'
                       id={workerInfo.workerID}
                       type="checkbox"
                       onClick={''}
                      //  checked={storedWorkersIDsOnSite.includes(workerInfo.workerID)}
                    />{' '}
                      {workerInfo.workerName}
                  </Label>
                </FormGroup>
              </DropdownItem>)}
            </DropdownMenu>

          </ButtonDropdown>

          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    </>
  );
};

SiteForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setSites: PropTypes.func,
  user: PropTypes.any,
  siteID: PropTypes.string,
  siteName: PropTypes.string,
  siteAddress: PropTypes.string,
  sitePicture: PropTypes.string,
  siteDescription: PropTypes.string,
  isJobFinished: PropTypes.bool,
  creatorID: PropTypes.string
};

export default SiteForm;
