import type { DepartmentDef, DepartmentId, AgentDef } from "../types";
import { sales } from "./sales";
import { member_success } from "./member_success";
import { customer_experience } from "./customer_experience";
import { operations } from "./operations";
import { business_intelligence } from "./business_intelligence";
import { psychology } from "./psychology";
import { platform_admin } from "./platform_admin";
import { negativity_detection } from "./negativity_detection";

export const DEPARTMENTS: Record<DepartmentId, DepartmentDef> = {
  sales,
  member_success,
  customer_experience,
  operations,
  business_intelligence,
  psychology,
  platform_admin,
  negativity_detection,
} as const;

export function getDepartment(id: DepartmentId): DepartmentDef {
  return DEPARTMENTS[id];
}

export function getAllDepartments(): DepartmentDef[] {
  return Object.values(DEPARTMENTS);
}

export function findAgent(agentId: string): { agent: AgentDef; department: DepartmentId; team: string } | null {
  for (const dept of Object.values(DEPARTMENTS)) {
    for (const team of dept.teams) {
      const agent = team.agents.find((a) => a.id === agentId);
      if (agent) return { agent, department: dept.id, team: team.id };
    }
  }
  return null;
}

export function getAgentsByTeam(teamId: string): AgentDef[] {
  for (const dept of Object.values(DEPARTMENTS)) {
    for (const team of dept.teams) {
      if (team.id === teamId) return team.agents;
    }
  }
  return [];
}

export function getAgentsByDepartment(deptId: DepartmentId): AgentDef[] {
  const dept = DEPARTMENTS[deptId];
  if (!dept) return [];
  return dept.teams.flatMap((t) => t.agents);
}
