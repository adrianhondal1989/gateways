import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core';

const Gateways = lazy(() => import('../components/gateways'));

const App = () => {
  return (
    <Router>
      <Suspense 
        fallback={
          <Backdrop
            open={true}
            invisible={true}
          >
            <CircularProgress size={40}/>
          </Backdrop>
        }
      >
        <Switch>
          <Route exact path="/" component={Gateways} />
          <Route path="*" component={Gateways} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
