import { combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/registrationSlice';
import aclReducer from './slices/aclSlice';
import commonReducer from "./slices/commonSlice";
import wareHouseItemsReducer from "./slices/wareHouseItemsSlice";

export const appReducer = combineReducers({
    registration: registrationReducer,
    acl: aclReducer,
    common: commonReducer,
    wareHouseItems : wareHouseItemsReducer
});


