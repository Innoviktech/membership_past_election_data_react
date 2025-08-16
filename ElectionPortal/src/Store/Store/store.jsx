import { configureStore } from '@reduxjs/toolkit';
import VoterReducer from '../Slice/VoterSlice';

const store = configureStore({
  reducer: {
    voter: VoterReducer,
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