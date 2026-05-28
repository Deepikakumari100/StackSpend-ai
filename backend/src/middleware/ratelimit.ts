import { isRateLimited } from '../lib/rate-limit';

export function validateRateLimit(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
  return !isRateLimited(ip);
}
