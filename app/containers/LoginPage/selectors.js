/**
 * Loginpage selectors
 */

import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeSelectToken = () => createSelector(
  selectLogin,
  (loginState) => loginState.get('token')
);

export {
  selectLogin,
  makeSelectToken,
};
