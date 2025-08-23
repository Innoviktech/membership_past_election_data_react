import { createSlice } from '@reduxjs/toolkit';
import { getPartyList,getElectionTypeList,getYearByElectionTypeList,getManifestoByPartyList,getAllManifestoList } from '../Middleware/ManifestoServices';

const ManifestoSlice = createSlice({
  name: 'manifesto',
  initialState: {
    states: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
		.addCase(getPartyList.pending, (state) => {
			state.loading = true;
		})
		.addCase(getPartyList.fulfilled, (state, action) => {
			state.loading = false;
			state.states = action.payload;
		})
		.addCase(getPartyList.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		})
		
		.addCase(getElectionTypeList.pending, (state) => {
			state.loading = true;
		})
		.addCase(getElectionTypeList.fulfilled, (state, action) => {
			state.loading = false;
			state.states = action.payload;
		})
		.addCase(getElectionTypeList.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		})

	  
		  // 🔹 getYearByElectionTypeList
		.addCase(getYearByElectionTypeList.pending, (state) => {
		  state.loading = true;
		})
		.addCase(getYearByElectionTypeList.fulfilled, (state, action) => {
		  state.loading = false;
		  state.years = action.payload;   // 👈 store in "years"
		})
		.addCase(getYearByElectionTypeList.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.error.message;
		})

		// 🔹 getManifestoByPartyList
		.addCase(getManifestoByPartyList.pending, (state) => {
		  state.loading = true;
		})
		.addCase(getManifestoByPartyList.fulfilled, (state, action) => {
		  state.loading = false;
		  state.manifestos = action.payload;  // 👈 store in "manifestos"
		})
		.addCase(getManifestoByPartyList.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.error.message;
		})

		// 🔹 getAllManifestoList
		.addCase(getAllManifestoList.pending, (state) => {
		  state.loading = true;
		})
		.addCase(getAllManifestoList.fulfilled, (state, action) => {
		  state.loading = false;
		  state.manifestos = action.payload;  // 👈 store in "manifestos"
		})
		.addCase(getAllManifestoList.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.error.message;
		});
  }
});

export default ManifestoSlice.reducer;