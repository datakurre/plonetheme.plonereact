/**
 * Url helper.
 * @module helpers/Url
 * @flow
 */

import { last } from 'lodash';
import $ from 'jquery';

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
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export function getBaseUrl(url: string): string {
  // Patch to use data-attributes from Plone 5 UI
  const baseUrl= $('body').data('base-url');
  return getPathname(baseUrl);
  // return url
  //   .replace(/\?.*$/, '')
  //   .replace('/add', '')
  //   .replace('/contents', '')
  //   .replace('/delete', '')
  //   .replace('/diff', '')
  //   .replace('/edit', '')
  //   .replace('/history', '')
  //   .replace('/layout', '')
  //   .replace('/login', '')
  //   .replace('/logout', '')
  //   .replace('/sharing', '')
  //   .replace('/search', '')
  //   .replace('/change-password', '')
  //   .replace('/personal-information', '')
  //   .replace('/personal-preferences', '');
}

/**
 * Get view of an url.
 * @function getView
 * @param {string} url Url to be parsed.
 * @return {string} View of content object.
 */
export function getView(url: string): string {
  const view = last(url.replace(/\?.*$/, '').split('/'));
  if (
    [
      'add',
      'layout',
      'contents',
      'edit',
      'delete',
      'diff',
      'history',
      'sharing',
    ].indexOf(view) === -1
  ) {
    return 'view';
  }
  return view === 'layout' ? 'edit' : view;
}

/**
 * Get icon
 * @method getIcon
 * @param {string} type Type of the item.
 * @param {bool} isFolderish Is folderish.
 * @returns {string} Icon name.
 */
export function getIcon(type: string, isFolderish: boolean): string {
  switch (type) {
    case 'Document':
      return 'file text outline';
    case 'Image':
      return 'file image outline';
    case 'File':
      return 'attach';
    case 'Link':
      return 'linkify';
    case 'Event':
      return 'calendar';
    default:
      return isFolderish ? 'folder open outline' : 'file outline';
  }
}
