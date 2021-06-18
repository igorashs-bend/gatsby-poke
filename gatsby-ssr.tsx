import { GatsbyBrowser } from 'gatsby';
import React from 'react';
import Layout from 'shared/Layout';
import ReduxWrapper from './src/redux/ReduxWrapper';

export const wrapRootElement = ReduxWrapper;

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
};
