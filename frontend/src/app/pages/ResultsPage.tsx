import { sendAuditEmail } from "../lib/email";
import { generateAuditPDF } from "../lib/downloadPdf";

import { useEffect, useState } from "react";
import AuditReport from "../components/report/AuditReport";

import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Sparkles,
  Mail,
  Share2,
  ArrowLeft,
  Building2,
  User,
} from "lucide-react";

import { RecommendationCard } from "../components/RecommendationCard";
import { generateRecommendations } from "../data/mockData";
import type { Recommendation } from "../types";

export function ResultsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [totalAnnualSavings, setTotalAnnualSavings] = useState(0);

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const auditDataStr = localStorage.getItem("auditData_" + id);

    if (!auditDataStr) {
      navigate("/");
      return;
    }

    const auditData = JSON.parse(auditDataStr || "{}");

    const recs = generateRecommendations(auditData);

    setRecommendations(recs);

    const total = recs.reduce(
      (sum, rec) => sum + rec.annualSavings,
      0
    );

    setTotalAnnualSavings(total);
  }, [id, navigate]);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 1. Generate PDF
      await generateAuditPDF();

      // 2. SAFE URL FIX
      const reportUrl = new URL(
        `/results/${id}`,
        window.location.origin
      ).toString();

      // 3. Send email with valid link
      await sendAuditEmail({
        user_name: company || "User",
        user_email: email,
        savings: totalAnnualSavings,
        report_link: reportUrl,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("FAILED:", error);
      alert(
        error instanceof Error
          ? error.message
          : "PDF or Email failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: "StackSpend Audit Results",
        text: `I could save $${totalAnnualSavings}/year on AI tools!`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0b0f] via-[#111827] to-[#1e1b4b] py-12 text-white">

      {/* GRID BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* BACK */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Back to audit form
        </Link>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
            <Sparkles className="size-4 text-green-400" />
            <span className="text-sm text-green-300">
              AI Audit Completed
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            You could save{" "}
            <span className="text-green-400">
              ${totalAnnualSavings}
            </span>
            /year
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            StackSpend analyzed your AI stack and identified savings opportunities.
          </p>
        </motion.div>

        {/* RECOMMENDATIONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8"
        >
          <h2 className="mb-6 text-3xl font-bold">
            Optimization Recommendations
          </h2>

          <div className="space-y-6">
            {recommendations.map((rec, i) => (
              <RecommendationCard
                key={i}
                recommendation={rec}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* EMAIL FORM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8"
        >
          {!submitted ? (
            <>
              <h3 className="mb-2 text-2xl font-bold">
                Download Full Audit Report
              </h3>

              <p className="mb-8 text-zinc-400">
                Receive your personalized PDF audit report instantly.
              </p>

              <form
                onSubmit={handleLeadCapture}
                className="grid gap-5 sm:grid-cols-2"
              >

                {/* EMAIL */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-zinc-300">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* COMPANY */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Company
                  </label>

                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white"
                      placeholder="Acme Inc"
                    />
                  </div>
                </div>

                {/* ROLE */}
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">
                    Role
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white"
                      placeholder="Engineering Manager"
                    />
                  </div>
                </div>

                {/* CTA BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="sm:col-span-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-lg"
                >
                  {loading ? "Generating..." : "Generate PDF Report"}
                </button>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <h3 className="mb-3 text-3xl font-bold text-green-400">
                Report Generated Successfully
              </h3>

              <p className="text-zinc-400">
                  Your PDF report has been downloaded and an email summary has been sent to your inbox.

              </p>

              <p className="mt-2 text-lg text-white">
                {email}
              </p>
            </div>
          )}
        </motion.div>

        {/* SHARE */}
        <div className="mt-10 text-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3"
          >
            <Share2 className="size-5" />
            Share Results
          </button>
        </div>

        {/* HIDDEN PDF */}
        <div className="fixed left-[-99999px] top-0 z-[-1]">
          <AuditReport
            auditId={id || "AUDIT-001"}
            monthlySavings={Math.floor(totalAnnualSavings / 12)}
            annualSavings={totalAnnualSavings}
            recommendations={recommendations.map((rec: any) => ({
              title: `${rec.currentPlan} → ${rec.recommendedPlan}`,
              description: rec.reason,
              savings: rec.annualSavings,
            }))}
          />
        </div>

      </div>
    </div>
  );
}
