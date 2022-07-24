import {
  configureStore
} from '@reduxjs/toolkit';
// Redusers
import {
  mapReducer
} from './map'
import {
  authReducer
} from './auth'

export const store = configureStore({
  reducer: {
    map: mapReducer,
    auth: authReducer,
  },
});