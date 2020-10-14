import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index';

import MainTemplate from '../templates/MainTemplate';
import StartView from './StartView';
import CollectionsView from './CollectionsView';
import EditorsView from './EditorsView';
import PracticeView from './PracticeView';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={StartView} />
          <Route exact path="/collections" component={CollectionsView} />
          <Route path="/edit" component={EditorsView} />
          <Route path="/practice" component={PracticeView} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </Provider>
);

export default Root;
