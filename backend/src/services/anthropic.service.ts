import Anthropic from '@anthropic-ai/sdk';
import { buildSummaryPrompt } from '../prompts/summary.prompt';

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

function createFallbackSummary(context: string) {
  const recMatch = context.match(/(\d+) recommendations?/i);
  const savingsMatch = context.match(/\$([\d,]+)/);
  const recCount = recMatch ? Number(recMatch[1]) : null;
  const savings = savingsMatch ? Number(savingsMatch[1].replace(/,/g, '')) : null;

  return `Your audit identified ${recCount ?? 'multiple'} optimization opportunities to lower AI spend while maintaining current team productivity. The main focus is on reducing plan costs, right-sizing seat counts, and consolidating overlapping tool licenses. These changes can save approximately $${savings?.toLocaleString() ?? 'a significant amount'} annually.`;
}

export async function generateSummary(context: string) {
  if (!anthropic) {
    return createFallbackSummary(context);
  }

  try {
    const response = await anthropic.completions.create({
      model: 'claude-2.1',
      prompt: buildSummaryPrompt(context),
      max_tokens_to_sample: 250,
    });

    return (
      response.completion ||
      createFallbackSummary(context)
    );
  } catch (error) {
    return createFallbackSummary(context);
  }
}
