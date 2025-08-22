import { configureStore } from '@reduxjs/toolkit';

// Import your reducers here
import counterReducer from './slices/counterSlice';
import roadmapReducer from './slices/roadmapSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    counter: counterReducer,
    roadmap: roadmapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
