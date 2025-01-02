export type ServerActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};