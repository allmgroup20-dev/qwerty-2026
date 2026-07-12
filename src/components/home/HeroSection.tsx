"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0B1121] via-[#111B33] to-[#0F1A2E]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2563EB]/10 blur-[120px] animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/10 blur-[100px] animate-blob" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-[#10B981]/10 blur-[80px] animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-sm font-semibold text-white/80">৮৬৬+ Active Learners</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6 animate-fade-up">
            <span className="text-white">Build Your</span>
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#F59E0B] bg-clip-text text-transparent">
              Career With Us
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up">
            Join the most rewarding affiliate marketing platform. Access 230+ premium courses, 
            build your team, and earn commissions — all from one powerful dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Journey
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up">
            {[
              { value: "৮৬৬+", label: "Active Learners" },
              { value: "৪.৯★", label: "Rating" },
              { value: "৮+ Years", label: "Experience" },
              { value: "৳৫০,০০০+", label: "Monthly Top Earner" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-sm text-white/50 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />
    </section>
  );
}
