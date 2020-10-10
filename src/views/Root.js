import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import StartView from './StartView';

const Root = () => (
  <BrowserRouter>
    <MainTemplate>
      <Switch>
        <Route exact path="/" component={StartView} />
      </Switch>
    </MainTemplate>
  </BrowserRouter>
);

export default Root;
