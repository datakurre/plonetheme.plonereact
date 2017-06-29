import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Registry from 'pat-registry';
import { Provider } from 'react-intl-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { browserHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Api, persistAuthToken } from '@plone/plone-react/src/helpers';
import { Diff, History } from '@plone/plone-react/src/components';
import configureStore from '@plone/plone-react/src/store';
import config from '@plone/plone-react/src/config';
import $ from 'jquery';

function getPathname(url) {
  const l = document.createElement('a');
  l.href = url;
  return l.pathname;
}


Registry.register({
  name: 'history',
  trigger: '.pat-history',

  init ($el) {
    const api = new Api();
    const $body = $('body');
    const baseUrl = $body.data('base-url');
    const portalUrl = $body.data('portal-url');

    new Promise((resolve) => {

      config.apiPath = portalUrl;
      resolve(api.get(getPathname(baseUrl)));

    }).then((data) => {

      const initialState = { content: { data: data }};
      const store = configureStore(initialState, undefined, false, api);
      const history = syncHistoryWithStore(browserHistory, store);
      persistAuthToken(store);

      const container = document.createElement('div');
      $el.replaceWith(container);

      ReactDOM.render((
        <Provider store={store} key="provider">
          <Router
            render={props => <ReduxAsyncConnect helpers={{ api }} {...props} />}
            history={history}>
            <Route path="/**/@@historyview" component={History} />
            <Route path="/**/diff" component={Diff} />
          </Router>
        </Provider>
      ), container);

    });
  }
});
