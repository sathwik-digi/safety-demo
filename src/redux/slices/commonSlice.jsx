import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    activeIndex : 0
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeLoadingState: (state) => {
        state.isLoading = false;
    },
    changeActiveIndexState: (state, action)=>{
        state.activeIndex = action.payload;
    }
}
});

export const { changeLoadingState, changeActiveIndexState } = commonSlice.actions;

export default commonSlice.reducer;
