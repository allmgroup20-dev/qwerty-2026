import { getAllAgents, updateAgentConfig } from "./registry";
import { runAgent } from "./executor";
import { synthesizeDomain, synthesizeSenior } from "./synthesizer";
import type { Agent } from "./types";

export async function checkAndRunDueAgents(): Promise<void> {
  const agents = await getAllAgents();
  const now = new Date();
  const nowIso = now.toISOString();

  for (const agent of agents) {
    if (agent.status === "disabled") continue;
    if (!agent.next_run_at) {
      const nextRun = new Date(now.getTime() + agent.cron_interval * 60000);
      await updateAgentConfig(agent.agent_id, { next_run_at: nextRun.toISOString() });
      continue;
    }

    const nextRunTime = new Date(agent.next_run_at);
    if (now >= nextRunTime) {
      try {
        if (agent.level === 1) {
          await runAgent(agent.agent_id);
        } else if (agent.level === 2) {
          await synthesizeDomain(agent.agent_id);
        } else if (agent.level === 3) {
          await synthesizeSenior();
        }

        const nextRun = new Date(now.getTime() + agent.cron_interval * 60000);
        await updateAgentConfig(agent.agent_id, { next_run_at: nextRun.toISOString() });
      } catch (e) {
        console.error(`Scheduler error for ${agent.agent_id}:`, (e as Error)?.message);
      }
    }
  }
}

export async function runAllAgents(): Promise<{ results: { agent_id: string; success: boolean; error?: string }[] }> {
  const agents = await getAllAgents();
  const results: { agent_id: string; success: boolean; error?: string }[] = [];

  for (const agent of agents) {
    if (agent.status === "disabled") continue;
    try {
      if (agent.level === 1) {
        const r = await runAgent(agent.agent_id);
        results.push(r);
      }
    } catch (e) {
      results.push({ agent_id: agent.agent_id, success: false, error: (e as Error)?.message });
    }
  }

  for (const agent of agents) {
    if (agent.status === "disabled" || agent.level !== 2) continue;
    try {
      const r = await synthesizeDomain(agent.agent_id);
      results.push(r);
    } catch (e) {
      results.push({ agent_id: agent.agent_id, success: false, error: (e as Error)?.message });
    }
  }

  try {
    const r = await synthesizeSenior();
    results.push(r);
  } catch (e) {
    results.push({ agent_id: "agent_senior", success: false, error: (e as Error)?.message });
  }

  return { results };
}
