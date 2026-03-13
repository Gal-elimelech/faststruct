import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit, resetRateLimitStoreForTesting } from './rate-limit';

function createRequest(ip?: string): Request {
  const headers = new Headers();
  if (ip) {
    headers.set('x-forwarded-for', ip);
  }
  return new Request('http://localhost/api/contact', { headers });
}

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimitStoreForTesting();
  });

  it('allows requests under the limit', () => {
    const req = createRequest('192.168.1.1');
    for (let i = 0; i < 3; i++) {
      const result = checkRateLimit(req);
      expect(result.success).toBe(true);
      expect(result.remaining).toBe(3 - i - 1);
    }
  });

  it('returns 429 when limit exceeded', () => {
    const req = createRequest('10.0.0.1');
    for (let i = 0; i < 3; i++) {
      checkRateLimit(req);
    }
    const result = checkRateLimit(req);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfterSeconds).toBeDefined();
  });

  it('tracks IPs separately', () => {
    const ip1 = createRequest('1.2.3.4');
    const ip2 = createRequest('5.6.7.8');

    for (let i = 0; i < 3; i++) {
      checkRateLimit(ip1);
    }
    const resultIp2 = checkRateLimit(ip2);
    expect(resultIp2.success).toBe(true);
    expect(resultIp2.remaining).toBe(2);
  });

  it('uses x-real-ip when x-forwarded-for is absent', () => {
    const headers = new Headers();
    headers.set('x-real-ip', '99.99.99.99');
    const req = new Request('http://localhost/api/contact', { headers });
    const result = checkRateLimit(req);
    expect(result.success).toBe(true);
  });
});
