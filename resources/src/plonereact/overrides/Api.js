/**
 * Api helper.
 * @module helpers/Api
 */

import superagent from 'superagent';
import cookie from 'react-cookie';
import $ from 'jquery';

import config from '@plone/plone-react/src/config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * Get pathname form url
 * @function getPathname
 * @param {string} url url from which the pathname is parsed from
 * @returns {string} pathname
 */
function getPathname(url) {
  const l = document.createElement('a');
  l.href = url;
  return l.pathname;
}

/**
 * Format the url.
 * @function formatUrl
 * @param {string} path Path to be formatted.
 * @returns {string} Formatted path.
 */
function formatUrl(path) {
  // Patch to strip portal root from path
  const portalUrl = $('body').data('portal-url');
  const adjustedPath = (path[0] !== '/' ? `/${path}` : path)
    .replace(new RegExp('^' + getPathname(portalUrl)), '');
  return `${config.apiPath}${adjustedPath}`;
}

/**
 * Api class.
 * @class Api
 */
export default class Api {
  /**
   * Constructor
   * @method constructor
   * @constructs Api
   */
  constructor() {
    methods.forEach(method => {
      this[method] = (path, { params, data, type } = {}) =>
    new Promise((resolve, reject) => {
      const request = superagent[method](formatUrl(path));

    if (params) {
      request.query(params);
    }

    const authToken = cookie.load('auth_token');
    if (authToken) {
      request.set('Authorization', `Bearer ${authToken}`);
    }

    request.set('Accept', 'application/json');

    if (type) {
      request.type(type);
    }

    if (data) {
      request.send(data);
    }

    request.end(
      (err, { body } = {}) => (err ? reject(body || err) : resolve(body)),
  );
  });
  });
  }
}
