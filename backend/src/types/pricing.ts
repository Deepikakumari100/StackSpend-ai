export interface PlanCostMap {
  [plan: string]: number;
}

export interface PricingSchema {
  [toolName: string]: PlanCostMap;
}
