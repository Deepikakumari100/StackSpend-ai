export interface AuditToolInput {
  name: string;
  plan: string;
  seats: number;
  monthlySpend: number;
  useCase?: string;
  enterpriseUsage?: boolean;
}

export interface AuditRequest {
  tools: AuditToolInput[];
  company?: string;
  teamSize?: number;
}

export interface Recommendation {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  currentCost: number;
  recommendedCost: number;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
}

export interface AuditResult {
  recommendations: Recommendation[];
  currentCost: number;
  optimizedCost: number;
  monthlySavings: number;
  annualSavings: number;
  slug: string;
}

export interface AuditRecord {
  id: string;
  slug: string;
  payload: AuditRequest;
  result: AuditResult;
  monthlySavings: number;
  annualSavings: number;
  createdAt: string;
}
