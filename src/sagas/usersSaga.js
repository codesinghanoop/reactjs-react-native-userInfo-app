import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getUserDetailsSuccess, getUserDetailsError } from '../actions';
import API from '../service/login';

function* fetchUsers() {
  try {
    const users = yield call(API.getUsers);
    if (users.status === 200) {
      yield put(getUserDetailsSuccess(users.data.items));
    }
  } catch (error) {
    yield put(getUserDetailsError(error));
  }
}

function* usersSaga() {
  yield takeLatest('USER_DETAILS_LOADING', fetchUsers);
}

export default usersSaga;
