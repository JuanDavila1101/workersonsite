import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  Button, Card, CardText, CardTitle, CardBody, CardSubtitle, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteSite } from '../helpers/data/sitesData';
import SiteForm from './SitesForm';
// import { getWorkers } from '../helpers/data/workersData';

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
}) => {
  const [editing, setEditing] = useState(false);
  // const history = useHistory();
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  // const [allWorkers, setAllWorkers] = useState([]);

  // useEffect(() => {
  //   getWorkers
  // }, []);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
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
    <Card style={{ width: '20rem' }}>
      <CardBody>
        <CardTitle tag="h5">Site:  </CardTitle>
      </CardBody>
      <img width="100%" src={sitePicture} alt="Site Image"/>
      <CardBody>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{siteName}</CardSubtitle>
        <CardText>Description: {siteDescription}</CardText>
        <CardText>Address: {siteAddress}</CardText>
        <CardText>The job is: {isJobFinished ? 'finished' : 'pending'}</CardText>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret size="sm">
            Small Button
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Check me out
                </Label>
              </FormGroup>
            </DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
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
  creatorID: PropTypes.string
};

export default SiteCard;
