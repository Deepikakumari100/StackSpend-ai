export function buildSummaryPrompt(context: string) {
  return `Write a concise, professional AI spend audit summary from the following findings:

${context}

Focus on savings, plan optimization, and next steps for the business.`;
}
