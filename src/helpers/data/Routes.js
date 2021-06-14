import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../../views/Home';
import SitesView from '../../views/SitesView';
import AddSiteView from '../../views/AddSiteView';
import AddWorkerView from '../../views/AddWorkerView';
import WorkersView from '../../views/WorkersView';

export default function Routes({
  sites, setSites, workers, setWorkers, user
}) {
  return (
    <div>
      <Switch>
        <Route
          exact path='/' component={Home}
        />
        <Route
          path='/sites'
          component={() => (<SitesView
                             sites={sites}
                             setSites={setSites}
                             user={user}
                             />)
                    }
        />
        <Route
          path='/sites-form'
          component={() => (<AddSiteView
                             user={user}
                             setSites={setSites}
                             />)
                    }
        />
        <Route
          path='/workers'
          component={() => (<WorkersView
                             workers={workers}
                             setWorkers={setWorkers}
                             user={user}
                             />)
                    }
        />
        <Route
          path='/workers-form'
          component={() => (<AddWorkerView
                             user={user}
                             setWorkers={setWorkers}
                             />)
                    }
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  sites: PropTypes.array.isRequired,
  setSites: PropTypes.func.isRequired,
  workers: PropTypes.array.isRequired,
  setWorkers: PropTypes.func.isRequired,
  user: PropTypes.any
};
