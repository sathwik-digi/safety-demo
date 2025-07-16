import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';

export const appReducer = combineReducers({
    registration: registrationReducer,
});


