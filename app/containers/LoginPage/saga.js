/**
 * Gets the list of wallets from BlockCypher API
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { CHECK_TOKEN } from 'containers/App/constants';
import { tokenValidated, checkTokenError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectToken } from 'containers/LoginPage/selectors';

/**
 * BlockCupher login request/response handler
 */
export function* checkToken() {
  // Select token from store
  const token = yield select(makeSelectToken());
  // There is no login endpoint in BlockCypher API, we simple check the token calling an endpoint
  const requestURL = `https://api.blockcypher.com/v1/bcy/test/wallets?token=${token}`;

  try {
    // Call our request helper (see 'utils/request')
    const wallets = yield call(request, requestURL);
    yield put(tokenValidated(wallets, token));
  } catch (err) {
    yield put(checkTokenError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* checkTokenWatcher() {
  // Watches for CHECK_TOKEN actions and calls checkLogin when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CHECK_TOKEN, checkToken);
}
