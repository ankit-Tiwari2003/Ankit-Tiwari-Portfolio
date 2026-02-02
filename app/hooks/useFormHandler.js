import { useCallback, useRef } from 'react';

/**
 * Custom hook for form handling with debouncing
 * Prevents unnecessary re-renders and API calls
 */
export const useFormHandler = (onSubmit) => {
  const submitTimeoutRef = useRef(null);
  const isSubmittingRef = useRef(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Prevent double submissions
      if (isSubmittingRef.current) return;
      
      isSubmittingRef.current = true;

      try {
        await onSubmit(e);
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [onSubmit]
  );

  // Cleanup timeout on unmount
  const cleanup = useCallback(() => {
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
  }, []);

  return { handleSubmit, cleanup, isSubmitting: isSubmittingRef.current };
};

/**
 * Custom hook for input field changes with debouncing
 * Useful for validation feedback without lag
 */
export const useDebouncedInputChange = (callback, delay = 300) => {
  const timeoutRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(e);
      }, delay);
    },
    [callback, delay]
  );

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { handleChange, cleanup };
};
