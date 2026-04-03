/**
 * Production-grade API Client with Retry Logic
 * Uses exponential backoff for transient failures (429, 5xx)
 */

interface FetchOptions extends RequestInit {
  retries?: number;
  backoff?: number; // ms
}

export async function secureFetch(url: string, options: FetchOptions = {}) {
  const { retries = 3, backoff = 1000, ...fetchOptions } = options;
  
  let lastError: any;

  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, fetchOptions);
      
      // Retry on transient server errors or rate limits
      if (response.status === 429 || (response.status >= 500 && response.status <= 599)) {
        throw new Error(`RETRYABLE_STATUS_${response.status}`);
      }

      if (!response.ok) {
        throw new Error(`NON_RETRYABLE_STATUS_${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      lastError = err;
      
      // Don't retry on non-retryable errors
      if (err.message.includes("NON_RETRYABLE")) break;
      
      if (i < retries) {
        const delay = backoff * Math.pow(2, i); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        console.warn(`API_RETRY_MODE: Attempt ${i + 1}/${retries} for ${url}`);
      }
    }
  }

  throw lastError;
}
