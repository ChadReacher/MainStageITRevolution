import {
  configureStore
} from '@reduxjs/toolkit';
// Redusers
import {
  mapReducer
} from './map'

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});