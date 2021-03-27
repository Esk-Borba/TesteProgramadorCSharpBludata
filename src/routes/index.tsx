import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);
export default Routes;
