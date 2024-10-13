import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { stateSlice } from '../slices/stateSlice';
import { dataSlice } from '../slices/dataSlice';

const rootReducer = combineReducers({
  state: stateSlice.reducer,
  data: dataSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };
