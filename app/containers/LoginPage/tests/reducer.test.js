import { fromJS } from 'immutable';

import loginReducer from '../reducer';
import {
  changeToken,
} from '../actions';

describe('loginReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      token: '',
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(loginReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeToken action correctly', () => {
    const fixture = '14c71464e5d0323691q7c314b42eg04';
    const expectedResult = state.set('token', fixture);

    expect(loginReducer(state, changeToken(fixture))).toEqual(expectedResult);
  });
});
