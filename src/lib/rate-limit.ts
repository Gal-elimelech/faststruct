/**
 * In-memory rate limiter using fixed-window algorithm.
 * Per-instance only - each serverless cold start gets a fresh Map.
 */

import { ipAddress } from '@vercel/functions';

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

const LIMIT = 3;
const WINDOW_MS = 60 * 1000; // 60 seconds

function getClientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp;
  return 'unknown';
}

function getClientIp(request: Request): string {
  try {
    const ip = ipAddress(request);
    if (ip) return ip;
  } catch {
    // ipAddress may throw when not on Vercel
  }
  return getClientIpFromHeaders(request.headers);
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSeconds?: number;
}

export function checkRateLimit(request: Request): RateLimitResult {
  const ip = getClientIp(request);
  const now = Date.now();
  const window = store.get(ip);

  if (!window) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: LIMIT - 1, resetAt: now + WINDOW_MS };
  }

  if (now >= window.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: LIMIT - 1, resetAt: now + WINDOW_MS };
  }

  window.count += 1;

  if (window.count > LIMIT) {
    const retryAfterSeconds = Math.ceil((window.resetAt - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetAt: window.resetAt,
      retryAfterSeconds,
    };
  }

  return {
    success: true,
    remaining: LIMIT - window.count,
    resetAt: window.resetAt,
  };
}

/** Clears rate limit store. Use in tests only. */
export function resetRateLimitStoreForTesting(): void {
  store.clear();
}
