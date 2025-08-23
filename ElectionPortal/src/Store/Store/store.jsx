import { configureStore } from '@reduxjs/toolkit';
import VoterReducer from '../Slice/VoterSlice';
import ManifestoReducer from '../Slice/ManifestoSlice';

const store = configureStore({
  reducer: {
    voter: VoterReducer,
    manifesto: ManifestoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.headers'],
        ignoredPaths: ['voter.states.headers']
      }
    })
});

export default store;