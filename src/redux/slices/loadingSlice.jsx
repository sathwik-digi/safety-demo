import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    changeLoadingState: (state) => {
        state.isLoading = false;
    }
}
});

export const { changeLoadingState } = loadingSlice.actions;

export default loadingSlice.reducer;
