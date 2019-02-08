import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Main from './containers/Main';

const Root = ({ store }) => (
  <Provider store={store}>
    <Main />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
};

export default Root;
