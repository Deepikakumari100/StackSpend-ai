import { z } from 'zod';

export const auditSchema = z.object({
  email: z.string().email().optional(),
  role: z.string().optional(),
  tools: z.array(
    z.object({
      name: z.string().min(1),
      plan: z.string().min(1),
      seats: z.number().int().nonnegative(),
      monthlySpend: z.number().nonnegative(),
      useCase: z.string().optional(),
      enterpriseUsage: z.boolean().optional()
    })
  ),
  company: z.string().optional(),
  teamSize: z.number().int().nonnegative().optional()
});

export const leadSchema = z.object({
  email: z.string().email(),
  company: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  teamSize: z.number().int().nonnegative().optional()
});

export const summarySchema = z.object({
  context: z.string().min(1)
});
