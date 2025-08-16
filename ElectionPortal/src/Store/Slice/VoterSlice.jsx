import { createSlice } from '@reduxjs/toolkit';
import { getStateList } from '../Middleware/VoterApiServices';

const VoterSlice = createSlice({
  name: 'voter',
  initialState: {
    states: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStateList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStateList.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(getStateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default VoterSlice.reducer;