export type AITool =
  | 'ChatGPT'
  | 'Claude'
  | 'Cursor'
  | 'GitHub Copilot'
  | 'Gemini'
  | 'OpenAI API'
  | 'Anthropic API'
  | 'Windsurf';

export type Plan =
  | 'Free'
  | 'Plus'
  | 'Pro'
  | 'Team'
  | 'Enterprise'
  | 'API Pay-as-you-go'
  | 'API Usage-based';

export type UseCase =
  | 'Code Generation'
  | 'Chat/Research'
  | 'Content Writing'
  | 'Data Analysis'
  | 'Mixed Usage';

export interface ToolUsage {
  id: string;
  tool: AITool;
  plan: Plan;
  monthlySpend: number;
  seats: number;
  teamSize: number;
  useCase: UseCase;
}

export interface Recommendation {
  currentPlan: Plan;
  recommendedPlan: Plan;
  monthlySavings: number;
  annualSavings: number;
  confidenceScore: number;
  reasoning: string;
  tool: AITool;
}

export interface AuditResults {
  toolUsages: ToolUsage[];
  recommendations: Recommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary: string;
}
