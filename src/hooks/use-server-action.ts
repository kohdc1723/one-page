"use client";

import { useCallback, useState } from "react";

import { SafeServerAction } from "@/types/actions";

interface UseServerActionCallbacks<TOutput> {
  // onSuccess?: (data: TOutput, message?: string) => void;
  onSuccess?: ({
    data,
    message
  }: {
    data: TOutput,
    message?: string
  }) => void;
  // onError?: (error: string, message?: string) => void;
  onError?: ({
    error,
    message
  }: {
    error: string,
    message?: string
  }) => void;
  onComplete?: () => void;
}

export default function useServerAction<TInput, TOutput>(
  action: SafeServerAction<TInput, TOutput>,
  callbacks: UseServerActionCallbacks<TOutput> = {}
) {
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeAction = useCallback(async (input: TInput) => {
    setIsLoading(true);

    try {
      const result = await action(input);

      if (result.isSuccess) {
        setData(result.data);
        setMessage(result.message);
        callbacks.onSuccess?.({
          data: result.data,
          message: result.message
        });
      } else {
        setError(result.error);
        setMessage(result.message);
        callbacks.onError?.({
          error: result.error,
          message: result.message
        });
      }
    } finally {
      setIsLoading(false);
      callbacks.onComplete?.();
    }
  }, [action, callbacks]);

  return {
    executeAction,
    error,
    data,
    message,
    isLoading
  };
}