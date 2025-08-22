import { createSelector } from '@reduxjs/toolkit';

// Basic selectors
export const selectCounter = (state) => state.counter;

export const selectCounterValue = (state) => state.counter.value;

export const selectCounterLoading = (state) => state.counter.loading;

export const selectCounterError = (state) => state.counter.error;

// Memoized selectors using createSelector
export const selectCounterInfo = createSelector(
  [selectCounterValue, selectCounterLoading, selectCounterError],
  (value, loading, error) => ({
    value,
    loading,
    error,
    isPositive: value > 0,
    isNegative: value < 0,
    isZero: value === 0,
  })
);

export const selectCounterStatus = createSelector(
  [selectCounterLoading, selectCounterError],
  (loading, error) => {
    if (loading) return 'loading';
    if (error) return 'error';
    return 'idle';
  }
); 