import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import aclReducer from './slices/aclSlice';
import loadReducer from "./slices/loadingSlice";
import wareHouseItemsReducer from "./slices/wareHouseItemsSlice";

export const appReducer = combineReducers({
    registration: registrationReducer,
    acl: aclReducer,
    loading: loadReducer,
    wareHouseItems : wareHouseItemsReducer
});


