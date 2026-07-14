import { callAI } from "@/lib/ai/router";
import { getLatestReport, getAgentSubmissions, createReport, logActivity, getAllAgents, getAgent } from "./registry";
import { buildSynthesisPrompt, buildSeniorPrompt, parseResearchResponse } from "./prompts";
import type { ResearchResult, RunResult } from "./types";

export async function synthesizeDomain(domainAgentId: string): Promise<RunResult> {
  const agent = await getAgent(domainAgentId);
  if (!agent || agent.level !== 2) {
    return { success: false, agent_id: domainAgentId, error: "Not a domain agent" };
  }

  try {
    const submissions = await getAgentSubmissions(domainAgentId, "to");
    const pendingSubmissions = submissions.filter((s) => s.status === "pending");

    if (pendingSubmissions.length === 0) {
      return { success: false, agent_id: domainAgentId, error: "No pending submissions" };
    }

    const childReports: { agentName: string; summary: string; recommendations: string[]; challenges: string[] }[] = [];

    for (const sub of pendingSubmissions) {
      const content = sub.content ? (JSON.parse(sub.content) as ResearchResult) : null;
      if (content) {
        childReports.push({
          agentName: sub.from_agent_id,
          summary: content.summary,
          recommendations: content.recommendations,
          challenges: content.challenges,
        });
      }
    }

    if (childReports.length === 0) {
      return { success: false, agent_id: domainAgentId, error: "No valid reports to synthesize" };
    }

    const prompt = buildSynthesisPrompt({ domainName: agent.name_bn, childReports });
    const response = await callAI({ messages: [{ role: "user", content: prompt }] }, 800);
    const result = parseResearchResponse(response.text);

    if (!result) {
      return { success: false, agent_id: domainAgentId, error: "Failed to parse synthesis response" };
    }

    await createReport(
      domainAgentId,
      `${agent.name_bn} — সমন্বিত রিপোর্ট`,
      result.summary,
      JSON.stringify({ patterns: result.challenges }),
      JSON.stringify(result.recommendations),
      JSON.stringify(result.metrics)
    );

    if (agent.parent_agent_id) {
      const { createSubmission } = await import("./registry");
      await createSubmission(
        domainAgentId,
        agent.parent_agent_id,
        "synthesis",
        `${agent.name_bn} — সমন্বিত রিপোর্ট`,
        JSON.stringify(result)
      );
    }

    for (const sub of pendingSubmissions) {
      const db = await (await import("@/lib/db")).ensureDB();
      await (await import("@/lib/db/queries")).execute({ DB: db },
        "UPDATE ai_agent_submissions SET status = 'approved', reviewed_at = datetime('now') WHERE id = ?",
        [sub.id]
      );
    }

    await logActivity(domainAgentId, "synthesized", `${childReports.length}টি রিপোর্ট সমন্বিত করা হয়েছে`);

    return { success: true, agent_id: domainAgentId };
  } catch (e) {
    return {
      success: false,
      agent_id: domainAgentId,
      error: (e as Error)?.message || "Synthesis failed",
    };
  }
}

export async function synthesizeSenior(): Promise<RunResult> {
  const agents = await getAllAgents();
  const senior = agents.find((a) => a.level === 3);
  if (!senior) {
    return { success: false, agent_id: "agent_senior", error: "Senior agent not found" };
  }

  try {
    const domains = agents.filter((a) => a.level === 2);
    const domainReports: {
      domainName: string;
      summary: string;
      topRecommendations: string[];
      metrics: Record<string, number>;
    }[] = [];

    for (const d of domains) {
      const report = await getLatestReport(d.agent_id);
      if (report) {
        let recommendations: string[] = [];
        try {
          recommendations = JSON.parse(report.recommendations || "[]");
        } catch {}
        let metrics: Record<string, number> = {};
        try {
          metrics = JSON.parse(report.metrics || "{}");
        } catch {}

        domainReports.push({
          domainName: d.name_bn,
          summary: report.summary_bn || "",
          topRecommendations: recommendations,
          metrics,
        });
      }
    }

    if (domainReports.length === 0) {
      return { success: false, agent_id: "agent_senior", error: "No domain reports available" };
    }

    const prompt = buildSeniorPrompt({ domainReports });
    const response = await callAI({ messages: [{ role: "user", content: prompt }] }, 1000);
    const result = parseResearchResponse(response.text);

    if (!result) {
      return { success: false, agent_id: "agent_senior", error: "Failed to parse senior report" };
    }

    await createReport(
      "agent_senior",
      "কোম্পানি-ব্যাপী রিসার্চ রিপোর্ট",
      result.summary,
      JSON.stringify({ findings: result.challenges }),
      JSON.stringify(result.recommendations),
      JSON.stringify(result.metrics)
    );

    await logActivity("agent_senior", "reported", `কোম্পানি-ব্যাপী রিপোর্ট তৈরি: ${result.recommendations.length}টি সুপারিশ`);

    return { success: true, agent_id: "agent_senior" };
  } catch (e) {
    return {
      success: false,
      agent_id: "agent_senior",
      error: (e as Error)?.message || "Senior synthesis failed",
    };
  }
}
