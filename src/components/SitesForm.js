import React, { useEffect, useState } from 'react';
import {
  FormGroup, Form, Label, Input, Button, DropdownToggle, DropdownMenu, DropdownItem, Dropdown
} from 'reactstrap';
import PropTypes from 'prop-types';
import { addSite, updateSite } from '../helpers/data/sitesData';
import { getWorkers } from '../helpers/data/workersData';
import { getWorkersInSite, deleteWorkerInSite } from '../helpers/data/WorkerInSiteData';

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
  onEditMode,
}) => {
  const [site, setSite] = useState({
    siteID: siteID || null,
    siteName: siteName || '',
    siteAddress: siteAddress || '',
    sitePicture: sitePicture || '',
    siteDescription: siteDescription || '',
    isJobFinished: isJobFinished || false,
    creatorID: creatorID || user ? user.uid : '',
    onEditMode: onEditMode || false,
  });

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [allWorkers, setAllWorkers] = useState([]);
  const [storedWorkersIDsOnSite, setStoredWorkersIDsOnSite] = useState([]);
  const [workersInSiteChanges0, setWorkersInSiteChanges0] = useState([]);
  const [workersForChangesx2, setWorkersForChangesx2] = useState([]);
  const workersInSiteChanges = [];

  useEffect(() => {
    getWorkers(user ? user.uid : '').then((workersArray) => setAllWorkers(workersArray));
    getWorkersInSite(site.siteID).then((selectedWorkersArray) => {
      setStoredWorkersIDsOnSite(selectedWorkersArray);
      setWorkersForChangesx2(selectedWorkersArray);
    });
  }, []);

  const handleSelectedWorkers = (selectedWorkerID) => {
    const isWorkerOnSite0 = (storedWorkersIDsOnSite.find((x) => x.workerID === selectedWorkerID) === null ? 'true' : 'false');

    workersInSiteChanges0.forEach((selected) => {
      workersInSiteChanges.push(selected);
    });

    if (isWorkerOnSite0 === 'false') {
      const obj = { siteID: null, workerID: selectedWorkerID };
      workersInSiteChanges.push(obj);
      setWorkersInSiteChanges0(workersInSiteChanges);
    }
    if (isWorkerOnSite0 === 'true') {
      const indexOfWorker = storedWorkersIDsOnSite.findIndex((x) => x.workerID === selectedWorkerID);
      if (indexOfWorker >= 0) {
        storedWorkersIDsOnSite.splice(indexOfWorker, 1);

        setWorkersInSiteChanges0(workersInSiteChanges);
      }
    }
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

      allWorkers.forEach((worker) => {
        if (workersInSiteChanges0.find((x) => x.workerID === worker.workerID)
            && workersForChangesx2.find((x) => x.workerID === worker.workerID)) {
          console.warn('do nothing');
        } else if (workersInSiteChanges0.find((x) => x.workerID !== worker.workerID)
            && workersForChangesx2.find((x) => x.workerID === worker.workerID)) {
          deleteWorkerInSite(worker.workerIDe);
        } else if (workersInSiteChanges0.find((x) => x.workerID === worker.workerID)
            && workersForChangesx2.find((x) => x.workerID !== worker.workerID)) {
          deleteWorkerInSite(worker.workerIDe);
        }
      });
    } else {
      addSite(site, user.uid, workersInSiteChanges0).then((sitesArray) => setSites(sitesArray));
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

  const isWorkerSelected = (checkWorkerID) => {
    if (workersInSiteChanges0.find((x) => x.workerID === checkWorkerID) || storedWorkersIDsOnSite.find((x) => x.workerID === checkWorkerID)) {
      return true;
    }
    return false;
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
            <Label>Is the Job Site Finished
            <Input
              name='isJobFinished'
              id='isJobFinished'
              type='checkbox'
              value={site.isJobFinished}
              onChange={handleInputChange}
            />
            </Label>
          </FormGroup>

          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              Workers
            </DropdownToggle>
            <DropdownMenu>
              {allWorkers.map((workerInfo) => <DropdownItem
                                                 key={workerInfo.workerID}
                                                 id={workerInfo.workerID}
                                                 toggle={false}
                                               >
                  <Label check>
                    <Input
                       name='isWorkerChecked'
                       id={workerInfo.workerID}
                       type="checkbox"
                       checked={isWorkerSelected(workerInfo.workerID)}
                       value={workersInSiteChanges0.find((x) => x.workerID === workerInfo.workerID)}
                       onClick={() => handleSelectedWorkers(workerInfo.workerID)}
                    />{' '}
                      {workerInfo.workerName}
                  </Label>
              </DropdownItem>)}

            </DropdownMenu>
          </Dropdown>

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
  creatorID: PropTypes.string,
  onEditMode: PropTypes.bool,
};

export default SiteForm;
