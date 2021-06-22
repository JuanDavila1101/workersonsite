import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardText, CardTitle, CardBody, CardSubtitle, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteSite } from '../helpers/data/sitesData';
import SiteForm from './SitesForm';
import { deleteAllworkersOnSite, getWorkersInSite } from '../helpers/data/WorkerInSiteData';

const SiteCard = ({
  setSites,
  user,
  siteID,
  siteName,
  siteAddress,
  sitePicture,
  siteDescription,
  isJobFinished,
  creatorID,
  workers,
}) => {
  const [editing, setEditing] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [storedWorkersIDsOnSite, setStoredWorkersIDsOnSite] = useState([]);

  useEffect(() => {
    getWorkersInSite(siteID).then((selectedWorkersArray) => setStoredWorkersIDsOnSite(selectedWorkersArray));
  }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteAllworkersOnSite(siteID);
        deleteSite(siteID, user.uid).then((sitesArray) => setSites(sitesArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('default');
    }
  };

  return (
    <Card style={{ width: '17rem' }}>
      <CardBody>
        <CardTitle tag="h5">Site:  </CardTitle>
      </CardBody>
      <img width="100%" src={sitePicture} alt="Site Image"/>
      <CardBody>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{siteName}</CardSubtitle>
        <CardText>Description: {siteDescription}</CardText>
        <CardText>Address: {siteAddress}</CardText>
        <CardText>The job is: {isJobFinished ? 'finished' : 'pending'}</CardText>
        <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}>
          <DropdownToggle disabled={storedWorkersIDsOnSite === null} caret size="sm">
            Workers on Site
          </DropdownToggle>
          <DropdownMenu>
              {storedWorkersIDsOnSite && workers.map((workerInfo) => <DropdownItem
                                                 key={workerInfo.workerID}
                                                 id={workerInfo.workerID}
                                                 toggle={false}
                                               >
                  {
                    storedWorkersIDsOnSite.find((x) => x.workerID === workerInfo.workerID) ? <Label>
                                                                               {workerInfo.workerName}
                                                                             </Label> : ''
                  }
              </DropdownItem>)}
          </DropdownMenu>
        </ButtonDropdown>
        <Button color="success" onClick={() => handleClick('edit')}>
          {editing ? 'Close Form' : 'Edit Site'}
        </Button>
        <Button color="danger" onClick={() => handleClick('delete')}>Delete this Site</Button>
          {editing && <SiteForm
                        formTitle='Edit Site'
                        setSites={setSites}
                        user={user}
                        siteID={siteID}
                        siteName={siteName}
                        siteAddress={siteAddress}
                        sitePicture={sitePicture}
                        siteDescription={siteDescription}
                        isJobFinished={isJobFinished}
                        creatorID={creatorID}
                        storedWorkersIDsOnSite={storedWorkersIDsOnSite}
                      />
          }
      </CardBody>
    </Card>
  );
};

ButtonDropdown.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func
};

SiteCard.propTypes = {
  setSites: PropTypes.func,
  user: PropTypes.any,
  siteID: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteAddress: PropTypes.string.isRequired,
  sitePicture: PropTypes.string.isRequired,
  siteDescription: PropTypes.string.isRequired,
  isJobFinished: PropTypes.bool.isRequired,
  creatorID: PropTypes.string,
  workers: PropTypes.array.isRequired
};

export default SiteCard;
