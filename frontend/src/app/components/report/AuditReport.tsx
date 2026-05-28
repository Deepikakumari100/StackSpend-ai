import React from "react";

interface Recommendation {
  title: string;
  description: string;
  savings: number;
}

interface AuditReportProps {
  auditId: string;
  monthlySavings: number;
  annualSavings: number;
  recommendations: Recommendation[];
}

export default function AuditReport({
  auditId,
  monthlySavings,
  annualSavings,
  recommendations,
}: AuditReportProps) {
  return (
    <div
      id="audit-report"
      className="w-[1200px] min-h-[1800px] bg-[#020617] text-white p-12"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-cyan-400"></div>

            <h1 className="text-5xl font-extrabold tracking-tight text-cyan-400">
              StackSpend
            </h1>
          </div>

          <p className="mt-4 text-lg text-slate-400">
            Enterprise AI Spend Optimization Report
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5 text-right shadow-lg">
          <p className="text-sm uppercase tracking-widest text-slate-500">
            Audit Report
          </p>

          <p className="mt-2 text-lg font-semibold text-white">
            {new Date().toDateString()}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Audit ID: {auditId}
          </p>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="mt-12 rounded-3xl border border-slate-800 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 p-10 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
              AI FINOPS ANALYSIS
            </p>

            <h2 className="text-6xl font-black leading-tight">
              Potential Annual Savings
            </h2>

            <p className="mt-6 text-xl leading-9 text-slate-300">
              Our analysis identified significant opportunities
              to optimize your AI tooling costs through pricing
              optimization, seat management, and smarter vendor allocation.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-black/30 px-10 py-8 text-center shadow-xl backdrop-blur">
            <p className="text-sm uppercase tracking-widest text-slate-400">
              Estimated Savings
            </p>

            <h1 className="mt-4 text-7xl font-black text-green-400">
              ${annualSavings}
            </h1>

            <p className="mt-4 text-lg text-slate-400">
              per year
            </p>
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="mt-10 grid grid-cols-3 gap-8">
        {/* MONTHLY */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-wider text-slate-500">
            Monthly Savings
          </p>

          <h3 className="mt-5 text-5xl font-bold text-green-400">
            ${monthlySavings}
          </h3>

          <p className="mt-4 text-slate-400">
            Estimated recurring monthly reduction
            in operational AI spend.
          </p>
        </div>

        {/* ANNUAL */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-wider text-slate-500">
            Annual Savings
          </p>

          <h3 className="mt-5 text-5xl font-bold text-cyan-400">
            ${annualSavings}
          </h3>

          <p className="mt-4 text-slate-400">
            Long-term savings opportunity through
            stack optimization.
          </p>
        </div>

        {/* SCORE */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-wider text-slate-500">
            Optimization Score
          </p>

          <h3 className="mt-5 text-5xl font-bold text-purple-400">
            95%
          </h3>

          <p className="mt-4 text-slate-400">
            Your organization has strong optimization
            potential.
          </p>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div className="mt-14 rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-12 w-1 rounded-full bg-cyan-400"></div>

          <div>
            <h2 className="text-4xl font-bold">
              Executive Summary
            </h2>

            <p className="mt-2 text-slate-500">
              Strategic AI cost optimization overview
            </p>
          </div>
        </div>

        <p className="text-xl leading-10 text-slate-300">
          StackSpend identified multiple opportunities
          to improve financial efficiency across your AI
          tooling ecosystem. Most savings originate from
          plan consolidation, underutilized enterprise
          seats, and pricing mismatches between API and
          subscription-based workflows.
          <br />
          <br />
          By implementing the recommendations below,
          organizations similar to yours typically reduce
          operational AI costs while maintaining team
          productivity and engineering output.
        </p>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="mt-14">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-bold">
              Key Recommendations
            </h2>

            <p className="mt-3 text-lg text-slate-500">
              Personalized optimization opportunities
              generated by StackSpend AI
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4 text-right">
            <p className="text-sm text-slate-500">
              Recommendations
            </p>

            <h3 className="text-3xl font-bold text-white">
              {recommendations.length}
            </h3>
          </div>
        </div>

        <div className="space-y-8">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
            >
              <div className="flex items-start justify-between gap-10">
                <div className="flex-1">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl font-bold text-cyan-400">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-white">
                        {rec.title}
                      </h3>

                      <p className="mt-1 text-sm uppercase tracking-wider text-slate-500">
                        Optimization Recommendation
                      </p>
                    </div>
                  </div>

                  <p className="text-lg leading-9 text-slate-300">
                    {rec.description}
                  </p>
                </div>

                <div className="min-w-[220px] rounded-2xl border border-green-500/20 bg-green-500/10 px-6 py-5 text-center">
                  <p className="text-sm uppercase tracking-widest text-slate-400">
                    Estimated Savings
                  </p>

                  <h3 className="mt-4 text-5xl font-black text-green-400">
                    ${rec.savings}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    annually
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div className="mt-16 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-10 text-center shadow-2xl">
        <h2 className="text-4xl font-bold">
          Ready to Optimize Your AI Spend?
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-xl leading-9 text-slate-300">
          StackSpend helps engineering and operations
          teams reduce unnecessary AI infrastructure
          costs while improving tooling efficiency
          across the organization.
        </p>

        <div className="mt-8 inline-flex rounded-2xl border border-cyan-500/20 bg-black/30 px-8 py-4">
          <span className="text-lg font-semibold text-cyan-400">
            stackspend.ai
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-20 flex items-center justify-between border-t border-slate-800 pt-8 text-sm text-slate-500">
        <div>
          <p className="font-medium text-slate-400">
            StackSpend
          </p>

          <p className="mt-2">
            AI Infrastructure Optimization Platform
          </p>
        </div>

        <div className="text-right">
          <p>
            Generated automatically by StackSpend AI
          </p>

          <p className="mt-2">
            Confidential • Internal Audit Report
          </p>
        </div>
      </div>
    </div>
  );
}