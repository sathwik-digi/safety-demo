import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import aclReducer from './slices/aclSlice';

export const appReducer = combineReducers({
    registration: registrationReducer,
    acl: aclReducer,
});


