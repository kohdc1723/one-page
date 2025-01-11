export type SafeServerAction<TInput, TOutput> = (values: TInput) => Promise<{
  isSuccess: true;
  data: TOutput;
  message?: string;
} | {
  isSuccess: false;
  error: string;
  message?: string;
}>;