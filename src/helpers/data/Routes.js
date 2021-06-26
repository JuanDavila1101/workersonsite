import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../../views/Home';
import SitesView from '../../views/SitesView';
import AddSiteView from '../../views/AddSiteView';
import AddWorkerView from '../../views/AddWorkerView';
import WorkersView from '../../views/WorkersView';

// From Dr T.
// The PrivateRoute function is creating a private route and returing the specified route based on the props
// We specify the specific props we want to use in the routeChecker and pass the rest with the spread
const PrivateRoute = ({ component: Component, user, ...rest }) => {
  // when we call this function in the return, it is looking for an argument. `props` here is taco.
  const routeChecker = (componentProps) => (user
    ? (<Component {...componentProps} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: componentProps.location } }} />));
    // this render method is one we can use instead of component. Since the components are being dynamically created, we use render. Read the docs for more info: https://reactrouter.com/web/api/Route/render-func
  // Just like in the routes if we want the dynamically rendered component to have access to the Router props, we have to pass `props` as an argument.
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
// From Dr. T end

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};

export default function Routes({
  sites, setSites, workers, setWorkers, user
}) {
  return (
    <div>
      <Switch>
        <Route
          exact path='/' component={Home}
        />
        <PrivateRoute
          user={user}
          path='/sites'
          component={() => (<SitesView
                             sites={sites}
                             setSites={setSites}
                             user={user}
                             workers={workers}
                             />)
                    }
        />
        <PrivateRoute
          user={user}
          path='/sites-form'
          component={() => (<AddSiteView
                             user={user}
                             setSites={setSites}
                             />)
                    }
        />
        <PrivateRoute
          user={user}
          path='/workers'
          component={() => (<WorkersView
                             workers={workers}
                             setWorkers={setWorkers}
                             user={user}
                             />)
                    }
        />
        <PrivateRoute
          user={user}
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
