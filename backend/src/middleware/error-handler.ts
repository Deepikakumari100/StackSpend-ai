export function handleApiError(error: unknown) {
  console.error('[api:error]', error);
  return {
    status: 'error',
    message: error instanceof Error ? error.message : 'An unexpected backend error occurred.'
  };
}
