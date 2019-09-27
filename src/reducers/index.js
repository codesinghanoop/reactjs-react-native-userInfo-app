import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import UsersReducer from './users';

const userPersistConfig = {
  key: 'users',
  storage,
  whitelist: ['data'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, UsersReducer),
});

export default rootReducer;
