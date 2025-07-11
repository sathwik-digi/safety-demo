import {createSlice} from '@reduxjs/toolkit';

const initialState = {
 data:[]
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    saveRegistrationData: (state,action) => {
        state.data = [...action.payload,...state.data];
    }
},
 
});

export const { changeAccountId } = registrationSlice.actions;

export default registrationSlice.reducer;
