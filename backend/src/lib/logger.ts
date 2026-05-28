export function log(...messages: unknown[]) {
  console.log('[backend]', ...messages);
}

export function error(message: string, details?: unknown) {
  console.error('[backend:error]', message, details);
}
