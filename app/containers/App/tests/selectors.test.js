import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectCurrentToken,
  makeSelectWallets,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectCurrentUser', () => {
  const currentUserSelector = makeSelectCurrentUser();
  it('should select the current user', () => {
    const username = 'mxstbr';
    const mockedState = fromJS({
      global: {
        currentUser: username,
      },
    });
    expect(currentUserSelector(mockedState)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  const reposSelector = makeSelectRepos();
  it('should select the repos', () => {
    const repositories = fromJS([]);
    const mockedState = fromJS({
      global: {
        userData: {
          repositories,
        },
      },
    });
    expect(reposSelector(mockedState)).toEqual(repositories);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/foo' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.get('location').toJS());
  });
});

describe('makeSelectCurrentToken', () => {
  const currentTokenSelector = makeSelectCurrentToken();
  it('should select the current token', () => {
    const token = '14c71464e5d0323691q7c314b42eg04';
    const mockedState = fromJS({
      global: {
        currentToken: token,
      },
    });
    expect(currentTokenSelector(mockedState)).toEqual(token);
  });
});

describe('makeSelectWallets', () => {
  const walletsSelector = makeSelectWallets();
  it('should select the wallets', () => {
    const wallets = fromJS([]);
    const mockedState = fromJS({
      global: {
        userData: {
          wallets,
        },
      },
    });
    expect(walletsSelector(mockedState)).toEqual(wallets);
  });
});
