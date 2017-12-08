import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  checkToken,
  tokenValidated,
  checkTokenError,
  loadRepos,
  reposLoaded,
  repoLoadingError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      currentUser: false,
      currentToken: false,
      userData: fromJS({
        repositories: false,
        wallets: false,
      }),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the checktoken action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'wallets'], false);

    expect(appReducer(state, checkToken())).toEqual(expectedResult);
  });

  it('should handle the tokenValidated action correctly', () => {
    const response = {
      wallet_names: [
        '582E2A9B55BF6837018915',
        '58A884F8A8A47869138798',
      ],
    };
    const token = '14c71464e5d0323691q7c314b42eg04';
    const wallets = [
      {
        id: '582E2A9B55BF6837018915',
        name: '582E2A9B55BF6837018915',
        token,
      },
      {
        id: '58A884F8A8A47869138798',
        name: '58A884F8A8A47869138798',
        token,
      },
    ];
    const expectedResult = state
      .setIn(['userData', 'wallets'], wallets)
      .set('loading', false)
      .set('currentToken', token);

    expect(appReducer(state, tokenValidated(response, token))).toEqual(expectedResult);
  });

  it('should handle the checkTokenError action correctly', () => {
    const fixture = {
      msg: 'Invalid token',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, checkTokenError(fixture))).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false)
      .setIn(['userData', 'repositories'], false);

    expect(appReducer(state, loadRepos())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [{
      name: 'My Repo',
    }];
    const username = 'test';
    const expectedResult = state
      .setIn(['userData', 'repositories'], fixture)
      .set('loading', false)
      .set('currentUser', username);

    expect(appReducer(state, reposLoaded(fixture, username))).toEqual(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, repoLoadingError(fixture))).toEqual(expectedResult);
  });
});
