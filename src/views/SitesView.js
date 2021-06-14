import React from 'react';
import PropTypes from 'prop-types';
import SiteCard from '../components/SiteCard';

function SitesView({ sites, setSites, user }) {
  return (
    <>
      <div className="sites-container">
        {
          sites.map((siteInformation) => (
            <SiteCard
              key={siteInformation.siteID}
              setSites={setSites}
              user={user}
              siteID={siteInformation.siteID}
              siteName={siteInformation.siteName}
              siteAddress={siteInformation.siteAddress}
              sitePicture={siteInformation.sitePicture}
              siteDescription={siteInformation.siteDescription}
              isJobFinished={siteInformation.isJobFinished}
              creatorID={siteInformation.creatorID}
            />
          ))
        }
      </div>
    </>
  );
}

SitesView.propTypes = {
  sites: PropTypes.array.isRequired,
  setSites: PropTypes.func.isRequired,
  user: PropTypes.any.isRequired
};

export default SitesView;
