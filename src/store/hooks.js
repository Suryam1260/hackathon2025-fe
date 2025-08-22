import { useDispatch, useSelector } from 'react-redux';

// Custom hook for useDispatch
export const useAppDispatch = () => useDispatch();

// Custom hook for useSelector
export const useAppSelector = useSelector;

// For TypeScript projects, you would type these hooks:
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 