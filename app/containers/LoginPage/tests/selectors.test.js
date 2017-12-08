import { fromJS } from 'immutable';

import {
  selectLogin,
  makeSelectToken,
} from '../selectors';

describe('selectLogin', () => {
  it('should select the login state', () => {
    const loginState = fromJS({
      userData: {},
    });
    const mockedState = fromJS({
      login: loginState,
    });
    expect(selectLogin(mockedState)).toEqual(loginState);
  });
});

describe('makeSelectToken', () => {
  const tokenSelector = makeSelectToken();
  it('should select the token', () => {
    const token = '14c71464e5d0323691q7c314b42eg04';
    const mockedState = fromJS({
      login: {
        token,
      },
    });
    expect(tokenSelector(mockedState)).toEqual(token);
  });
});
