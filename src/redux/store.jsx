import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist';
import {appReducer} from './'; // combineReducers(...) or your main reducer

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
