import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';

const appReducer = combineReducers({
    registration: registrationReducer,
});


export {appReducer};
