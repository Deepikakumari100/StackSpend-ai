const requestCounts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 40;

export function isRateLimited(key: string) {
  const now = Date.now();
  const stored = requestCounts.get(key);

  if (!stored || stored.resetAt <= now) {
    requestCounts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  stored.count += 1;
  if (stored.count > MAX_REQUESTS) {
    return true;
  }

  requestCounts.set(key, stored);
  return false;
}

export function getRateLimitMetadata(key: string) {
  const stored = requestCounts.get(key);
  return {
    requests: stored?.count ?? 0,
    limit: MAX_REQUESTS,
    resetAt: stored?.resetAt ?? Date.now() + WINDOW_MS
  };
}
