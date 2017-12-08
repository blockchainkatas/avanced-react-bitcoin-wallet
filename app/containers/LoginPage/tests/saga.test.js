/**
 * Tests for LoginPage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { CHECK_TOKEN } from 'containers/App/constants';
import { tokenValidated, checkTokenError } from 'containers/App/actions';

import checkTokenWatcher, { checkToken } from '../saga';

const token = '14c71464e5d0323691q7c314b42eg04';

/* eslint-disable redux-saga/yield-effects */
describe('checkToken Saga', () => {
  let checkTokenGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    checkTokenGenerator = checkToken();

    const selectDescriptor = checkTokenGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = checkTokenGenerator.next(token).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the tokenValidated action if it requests the data successfully', () => {
    const response = {
      wallet_names: [
        '58A884F8A8A47869138798',
        '58A885479E786982212958',
      ],
    };
    const putDescriptor = checkTokenGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(tokenValidated(response, token)));
  });

  it('should call the checkTokenError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = checkTokenGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(checkTokenError(response)));
  });
});

describe('checkTokenWatcherSage Saga', () => {
  const checkTokenWatcherSage = checkTokenWatcher();

  it('should start task to watch for CHECK_TOKEN action', () => {
    const takeLatestDescriptor = checkTokenWatcherSage.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(CHECK_TOKEN, checkToken));
  });
});
