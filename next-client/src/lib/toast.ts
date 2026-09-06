import { useSyncExternalStore } from "react";

/**
 * Backend response structure based on responseHandler.js
 * Success: { success: 1, message: string, data?: T }
 * Error:   { success: 0, message: string, error?: unknown }
 */
export interface ApiResponse<T = unknown> {
  success: 1 | 0 | boolean;
  message: string;
  data?: T;
  error?: unknown;
}

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface ToastOptions {
  id?: string;
  duration?: number;
  details?: string | string[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastItem extends ToastOptions {
  id: string;
  type: ToastType;
  message: string;
  createdAt: number;
}

// In-memory store for toasts
let toasts: ToastItem[] = [];
let listeners: Array<() => void> = [];

const notify = () => {
  listeners.forEach((listener) => listener());
};

const generateId = () => `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/**
 * Core dispatch function
 */
function createToast(type: ToastType, message: string, options?: ToastOptions): string {
  const id = options?.id || generateId();
  const duration = options?.duration ?? (type === "loading" ? 0 : 4500);

  const existingIndex = toasts.findIndex((t) => t.id === id);
  const newToast: ToastItem = {
    ...options,
    id,
    type,
    message,
    duration,
    createdAt: Date.now(),
  };

  if (existingIndex > -1) {
    toasts[existingIndex] = newToast;
  } else {
    // Keep max 5 toasts visible at once to avoid HUD clutter
    toasts = [...toasts.slice(-4), newToast];
  }

  notify();
  return id;
}

/**
 * Dismiss a toast by id (or dismiss all if no id passed)
 */
function dismiss(id?: string) {
  if (id) {
    toasts = toasts.filter((t) => t.id !== id);
  } else {
    toasts = [];
  }
  notify();
}

/**
 * Helper to extract human-readable error details from backend response
 */
function extractErrorDetails(error: unknown): string | string[] | undefined {
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (Array.isArray(error)) {
    return error.map((e) => (typeof e === "string" ? e : JSON.stringify(e)));
  }
  if (typeof error === "object") {
    const errObj = error as Record<string, unknown>;
    if (errObj.message && typeof errObj.message === "string") {
      return errObj.message;
    }
  }
  return undefined;
}

/**
 * Unified Toast API
 */
export const toast = {
  success: (message: string, options?: ToastOptions) => createToast("success", message, options),
  error: (message: string, options?: ToastOptions) => createToast("error", message, options),
  info: (message: string, options?: ToastOptions) => createToast("info", message, options),
  warning: (message: string, options?: ToastOptions) => createToast("warning", message, options),
  loading: (message: string, options?: ToastOptions) => createToast("loading", message, options),
  dismiss,

  /**
   * Directly handles backend responses formatted by responseHandler.js:
   * - { success: 1, message, data } -> triggers toast.success
   * - { success: 0, message, error } -> triggers toast.error with details
   * - Caught errors/exceptions -> extracts message and triggers toast.error
   */
  api: (responseOrError: unknown, options?: ToastOptions): { success: boolean; data?: unknown; error?: unknown } => {
    // 1. Check if it matches backend ApiResponse shape
    if (responseOrError && typeof responseOrError === "object") {
      const res = responseOrError as Partial<ApiResponse>;

      // Success payload (success: 1 or success: true)
      if (res.success === 1 || res.success === true) {
        toast.success(res.message || "Operation successful", options);
        return { success: true, data: res.data };
      }

      // Error payload (success: 0 or success: false)
      if (res.success === 0 || res.success === false) {
        const details = options?.details ?? extractErrorDetails(res.error);
        toast.error(res.message || "Something went wrong", {
          ...options,
          details,
        });
        return { success: false, error: res.error };
      }

      // Axios or Fetch response error shape: err.response?.data
      const axiosErr = responseOrError as { response?: { data?: Partial<ApiResponse> }; message?: string };
      if (axiosErr.response?.data) {
        return toast.api(axiosErr.response.data, options);
      }
    }

    // 2. Standard Error instance
    if (responseOrError instanceof Error) {
      toast.error(responseOrError.message || "Network / unexpected error", options);
      return { success: false, error: responseOrError.message };
    }

    // 3. String error
    if (typeof responseOrError === "string") {
      toast.error(responseOrError, options);
      return { success: false, error: responseOrError };
    }

    // 4. Fallback
    toast.error("An unexpected error occurred", options);
    return { success: false, error: responseOrError };
  },

  /**
   * Wraps an async Promise with loading HUD, then resolves with success or error
   * automatically checking backend responseHandler structure.
   */
  promise: async <T>(
    promise: Promise<T>,
    msgs?: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((err: unknown) => string);
    }
  ): Promise<T> => {
    const id = toast.loading(msgs?.loading || "Processing request...");

    try {
      const result = await promise;

      // If resolved value is a backend ApiResponse with success: 0
      if (result && typeof result === "object" && "success" in result) {
        const apiRes = result as unknown as ApiResponse;
        if (apiRes.success === 0 || apiRes.success === false) {
          toast.api(apiRes, { id });
          return result;
        }
      }

      const successMsg =
        typeof msgs?.success === "function"
          ? msgs.success(result)
          : msgs?.success || (result as unknown as Partial<ApiResponse>)?.message || "Success";

      toast.success(successMsg, { id });
      return result;
    } catch (err) {
      if (msgs?.error) {
        const errorMsg = typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
        toast.error(errorMsg, { id });
      } else {
        toast.api(err, { id });
      }
      throw err;
    }
  },
};

/**
 * React hook subscribing to the toast store
 */
export function useToasts(): ToastItem[] {
  return useSyncExternalStore(
    (callback) => {
      listeners.push(callback);
      return () => {
        listeners = listeners.filter((l) => l !== callback);
      };
    },
    () => toasts,
    () => []
  );
}
