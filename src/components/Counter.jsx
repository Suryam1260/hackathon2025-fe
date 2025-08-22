import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { increment, decrement, incrementByAmount, reset } from '../store/slices/counterSlice';
import { selectCounterInfo, selectCounterStatus } from '../selectors';

const Counter = () => {
  const dispatch = useAppDispatch();
  const counterInfo = useAppSelector(selectCounterInfo);
  const status = useAppSelector(selectCounterStatus);

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(5));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Redux Counter</h2>
      
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {counterInfo.value}
        </div>
        <div className="text-sm text-gray-500">
          Status: {status} | 
          {counterInfo.isPositive && ' Positive'} 
          {counterInfo.isNegative && ' Negative'} 
          {counterInfo.isZero && ' Zero'}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +1
        </button>
        
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -1
        </button>
        
        <button
          onClick={handleIncrementByAmount}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          +5
        </button>
        
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {counterInfo.error && (
        <div className="text-red-500 text-center text-sm">
          Error: {counterInfo.error}
        </div>
      )}
    </div>
  );
};

export default Counter; 