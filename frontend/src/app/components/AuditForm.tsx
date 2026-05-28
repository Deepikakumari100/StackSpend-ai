import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import type {
  AITool,
  Plan,
  UseCase,
  ToolUsage,
} from '../types';

const AI_TOOLS: AITool[] = [
  'ChatGPT',
  'Claude',
  'Cursor',
  'GitHub Copilot',
  'Gemini',
  'OpenAI API',
  'Anthropic API',
  'Windsurf',
];

const PLANS: Plan[] = [
  'Free',
  'Plus',
  'Pro',
  'Team',
  'Enterprise',
  'API Pay-as-you-go',
  'API Usage-based',
];

const USE_CASES: UseCase[] = [
  'Code Generation',
  'Chat/Research',
  'Content Writing',
  'Data Analysis',
  'Mixed Usage',
];

export function AuditForm() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tools, setTools] = useState<ToolUsage[]>([
    {
      id: crypto.randomUUID(),
      tool: 'ChatGPT',
      plan: 'Team',
      monthlySpend: 0,
      seats: 1,
      teamSize: 1,
      useCase: 'Code Generation',
    },
  ]);

  const addTool = () => {
    setTools([
      ...tools,
      {
        id: crypto.randomUUID(),
        tool: 'Claude',
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
        teamSize: 1,
        useCase: 'Code Generation',
      },
    ]);
  };

  const removeTool = (id: string) => {
    if (tools.length > 1) {
      setTools(tools.filter((tool) => tool.id !== id));
    }
  };

  const updateTool = (
    id: string,
    updates: Partial<ToolUsage>
  ) => {
    setTools(
      tools.map((tool) =>
        tool.id === id
          ? { ...tool, ...updates }
          : tool
      )
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const hasValidData = tools.some(
      (tool) => tool.monthlySpend > 0
    );

    if (!hasValidData) {
      alert(
        'Please enter monthly spend for at least one tool.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // CREATE UNIQUE REPORT ID
      const reportId = crypto.randomUUID();

      // SAVE REPORT DATA
      localStorage.setItem(
        `auditData_${reportId}`,
        JSON.stringify(tools)
      );

      // SMALL LOADING DELAY
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      // GO TO RESULTS PAGE
      navigate(`/results/${reportId}`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="audit" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Start Your Free Audit
          </h2>

          <p className="text-lg text-zinc-400">
            Tell us about your AI tools and we'll analyze your spend
          </p>
        </motion.div>

        {/* FORM */}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <AnimatePresence mode="popLayout">

            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
              >

                <div className="mb-6 flex items-center justify-between">

                  <h3 className="font-semibold text-white">
                    Tool #{index + 1}
                  </h3>

                  {tools.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeTool(tool.id)
                      }
                      className="rounded-lg p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}

                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* AI TOOL */}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      AI Tool
                    </label>

                    <select
                      value={tool.tool}
                      onChange={(e) =>
                        updateTool(tool.id, {
                          tool: e.target
                            .value as AITool,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                    >
                      {AI_TOOLS.map((item) => (
                        <option
                          key={item}
                          value={item}
                          className="bg-zinc-900"
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PLAN */}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Current Plan
                    </label>

                    <select
                      value={tool.plan}
                      onChange={(e) =>
                        updateTool(tool.id, {
                          plan: e.target
                            .value as Plan,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                    >
                      {PLANS.map((item) => (
                        <option
                          key={item}
                          value={item}
                          className="bg-zinc-900"
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* MONTHLY SPEND */}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Monthly Spend ($)
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={
                        tool.monthlySpend || ''
                      }
                      onChange={(e) =>
                        updateTool(tool.id, {
                          monthlySpend:
                            parseFloat(
                              e.target.value
                            ) || 0,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                      placeholder="500"
                    />
                  </div>

                  {/* SEATS */}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Seats
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={tool.seats}
                      onChange={(e) =>
                        updateTool(tool.id, {
                          seats:
                            parseInt(
                              e.target.value
                            ) || 1,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                    />
                  </div>

                  {/* TEAM SIZE */}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Team Size
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={tool.teamSize}
                      onChange={(e) =>
                        updateTool(tool.id, {
                          teamSize:
                            parseInt(
                              e.target.value
                            ) || 1,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                    />
                  </div>

                  {/* USE CASE */}

                  <div>
                    <label className="mb-2 block text-sm text-zinc-300">
                      Primary Use Case
                    </label>

                    <select
                      value={tool.useCase}
                      onChange={(e) =>
                        updateTool(tool.id, {
                          useCase:
                            e.target
                              .value as UseCase,
                        })
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                    >
                      {USE_CASES.map((item) => (
                        <option
                          key={item}
                          value={item}
                          className="bg-zinc-900"
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
              </motion.div>
            ))}

          </AnimatePresence>

          {/* ADD TOOL */}

          <button
            type="button"
            onClick={addTool}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/[0.02] px-6 py-4 text-zinc-400 hover:border-white/30 hover:text-white"
          >
            <Plus className="size-5" />
            Add Another Tool
          </button>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-semibold text-white"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="size-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Generate My Audit Report

                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

        </motion.form>
      </div>
    </section>
  );
}