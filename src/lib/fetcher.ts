import { headers } from "next/headers";

interface FetchSuccess<T> {
  success: true;
  data?: T;
}

interface FetchFailure {
  success: false;
  error?: string;
}

type FetchResponse<T> = FetchSuccess<T> | FetchFailure;

export const fetcher = async <T>(
  url: string,
  requestInit: RequestInit = {}
): Promise<FetchResponse<T>> => {
  try {
    const serverHeaders = await headers();
    const mergedHeaders = new Headers(serverHeaders);
    if (requestInit.headers) {
      const requestHeaders = new Headers(requestInit.headers);
      requestHeaders.forEach((val, key) => mergedHeaders.set(key, val));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${url}`, {
      headers: mergedHeaders,
      ...requestInit
    });
  
    if (!response.ok) {
      return {
        success: false,
        error: `${response.status}: ${response.statusText}`
      };
    }

    const data: T = await response.json();
  
    return {
      success: true,
      data
    };
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err);

    return {
      success: false,
      error: "Failed to fetch"
    };
  }
}