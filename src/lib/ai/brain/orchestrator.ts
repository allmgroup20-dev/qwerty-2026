import { callAI } from "../router";
import { executeAgent, buildAgentPrompt } from "./executor";
import { DEPARTMENTS, getAgentsByDepartment, findAgent } from "./registry";
import type { Intent, DepartmentId, MessageCtx, BrainResult, AgentDef } from "./types";

// ── Intent → Department routing ──
const INTENT_ROUTES: { intent: Intent; department: DepartmentId }[] = [
  { intent: "greeting", department: "customer_experience" },
  { intent: "farewell", department: "customer_experience" },
  { intent: "product_inquiry", department: "sales" },
  { intent: "price_inquiry", department: "sales" },
  { intent: "purchase", department: "sales" },
  { intent: "registration", department: "member_success" },
  { intent: "support", department: "customer_experience" },
  { intent: "complaint", department: "psychology" },
  { intent: "feedback", department: "customer_experience" },
  { intent: "referral", department: "sales" },
  { intent: "commission_inquiry", department: "member_success" },
  { intent: "withdrawal", department: "operations" },
  { intent: "training", department: "member_success" },
  { intent: "motivation", department: "psychology" },
  { intent: "general", department: "sales" },
];

// ── Sequential chains: department_intent → ordered list of agent IDs ──
const CHAINS: Record<string, string[]> = {
  // Sales
  "sales_purchase": ["lead_scanner", "lead_scorer", "product_matcher", "price_explainer", "trust_objection_handler", "trial_closer", "payment_link_sender", "confirmation_sender"],
  "sales_price_inquiry": ["lead_scanner", "lead_classifier", "price_explainer", "price_objection_handler", "discount_closer", "installment_closer"],
  "sales_product_inquiry": ["lead_scanner", "lead_classifier", "product_matcher", "benefit_highlighter", "comparison_builder", "social_proof_injector", "urgency_creator"],
  "sales_referral": ["referral_explainer", "social_proof_injector", "referral_closer"],
  "sales_general": ["lead_scanner", "followup_scheduler", "re_engagement_trigger"],

  // Member Success
  "member_success_registration": ["registration_guide", "welcome_pack_sender", "first_goal_setter", "profile_completer", "tree_placer"],
  "member_success_training": ["skill_gap_analyzer", "personalized_training_plan", "course_recommender", "quiz_generator", "progress_tracker", "certification_issuer"],
  "member_success_commission_inquiry": ["commission_calculator", "earning_reporter", "payout_optimizer"],
  "member_success_motivation": ["daily_motivation_sender", "achievement_celebrator", "competition_creator"],
  "member_success_general": ["query_resolver", "policy_explainer", "escalation_handler"],

  // Customer Experience
  "customer_experience_greeting": ["greeting_personalizer", "rapport_builder"],
  "customer_experience_farewell": ["greeting_personalizer"],
  "customer_experience_support": ["faq_responder", "order_status_checker", "payment_issue_resolver", "delivery_tracker", "return_exchange_handler", "refund_processor"],
  "customer_experience_complaint": ["complaint_listener", "root_cause_finder", "solution_crafter", "satisfaction_restorer"],
  "customer_experience_feedback": ["feedback_collector", "sentiment_analyzer", "improvement_suggester", "nps_calculator"],

  // Operations
  "operations_withdrawal": ["withdrawal_validator", "withdrawal_approver", "payment_sender", "withdrawal_notifier"],
  "operations_order_status": ["order_creator", "order_verifier", "invoice_generator", "order_notifier"],
  "operations_payment": ["sslcommerz_initiator", "ipn_validator", "payment_status_checker", "refund_initiator", "fraud_detector"],
  "operations_general": ["order_status_checker", "payment_status_checker"],

  // Business Intelligence
  "business_intelligence_research": ["pain_point_miner", "opportunity_detector", "competitor_tracker", "industry_researcher"],
  "business_intelligence_analytics": ["sales_analyst", "member_growth_analyst", "conversion_funnel_analyst", "predictive_modeler"],
  "business_intelligence_report": ["report_compiler", "swot_analyzer", "knowledge_base_updater"],

  // Psychology
  "psychology_complaint": ["mood_detector", "empathy_expresser", "frustration_calmer", "trust_builder", "conflict_resolver"],
  "psychology_motivation": ["mood_detector", "confidence_booster", "excitement_amplifier", "future_pacing_agent", "goal_achievement_coach"],
  "psychology_objection": ["personality_classifier", "comm_style_identifier", "rapport_builder", "reframing_agent", "reciprocity_trigger", "authority_builder", "social_proof_amplifier"],
  "psychology_general": ["mood_detector", "rapport_builder", "empathy_expresser"],

  // Platform Admin
  "platform_admin_settings": ["commission_config_validator", "settings_backup", "test_mode_manager"],
  "platform_admin_translation": ["translation_manager", "content_localizer"],
  "platform_admin_security": ["suspicious_activity_detector", "login_monitor", "permission_checker"],
  "platform_admin_update": ["db_health_monitor", "api_availability_checker", "performance_monitor", "error_log_analyzer", "update_manager"],
};

const DEPT_INTENT_PROMPTS: Record<DepartmentId, string> = {
  sales: "Classify the intent. Choose ONE: product_inquiry (asking about products/services), price_inquiry (asking about price/cost/value), purchase (ready to buy/pay), referral (asking about referral/team), general (other sales related), unknown.",
  member_success: "Classify the intent. Choose ONE: registration (wants to join/register), commission_inquiry (asking about commission/earnings), training (asking about training/learning), motivation (needs encouragement), general, unknown.",
  customer_experience: "Classify the intent. Choose ONE: greeting (hello/hi/assalamu alaikum), farewell (bye/okay/thanks), support (help/issue/problem), complaint (angry/upset/dissatisfied), feedback (suggestion/opinion/review), general, unknown.",
  operations: "Classify the intent. Choose ONE: withdrawal (want to withdraw money), order_status (asking about order), payment (payment issue), general, unknown.",
  business_intelligence: "Classify the intent. Choose ONE: research (market/competitor info), analytics (data/stats), report (wants report), general, unknown.",
  psychology: "Classify the intent. Choose ONE: complaint (angry/frustrated/scam fear), motivation (needs encouragement/demotivated), objection (hesitant/doubting), general, unknown.",
  platform_admin: "Classify the intent. Choose ONE: settings (configuration), translation (language/traslation), security (login/access), update (version/update), general, unknown.",
};

async function detectIntent(text: string, ctx: MessageCtx, fallbackDept: DepartmentId): Promise<{ intent: Intent; department: DepartmentId }> {
  const departmentsToCheck: DepartmentId[] = ["sales", "psychology", "customer_experience", "member_success", "operations"];

  for (const deptId of departmentsToCheck) {
    try {
      const result = await callAI(
        {
          messages: [
            { role: "system", content: DEPT_INTENT_PROMPTS[deptId] },
            { role: "user", content: `Message: "${text}"\nCustomer role: ${ctx.role}\nLanguage: ${ctx.language}\nMood: ${ctx.mood}\nReturn only the intent word.` },
          ],
        },
        50, "gemma-4-26b", "openrouter"
      );
      const intent = result.text.trim().toLowerCase() as Intent;
      const route = INTENT_ROUTES.find((r) => r.intent === intent);
      if (route) return { intent, department: route.department };
    } catch {}
  }

  return { intent: "general", department: fallbackDept };
}

function buildContext(ctx: MessageCtx, intent: Intent, chainOutput?: string): Record<string, any> {
  return {
    language: ctx.language === "bn" ? "Bengali" : ctx.language === "en" ? "English" : "Bengali with English mix",
    customerName: ctx.name || "Valued Customer",
    customerPhone: ctx.phone,
    customerRole: ctx.role === "customer" ? "potential member" : ctx.role === "worker" ? "registered member" : "admin",
    mood: ctx.mood,
    dialect: ctx.dialect || "standard Bengali",
    religion: ctx.religion || "not specified",
    funnelStage: ctx.funnelStage || "general",
    totalChats: String(ctx.totalChats),
    painPoints: ctx.painPoints?.join(", ") || "not identified",
    interests: ctx.interests?.join(", ") || "not identified",
    isWorker: String(ctx.isWorker),
    context: `Previous chat count: ${ctx.totalChats}. Mood: ${ctx.mood}.` +
      (ctx.dialect ? ` Dialect: ${ctx.dialect}.` : "") +
      (ctx.religion ? ` Religion: ${ctx.religion}.` : "") +
      (ctx.funnelStage ? ` Stage: ${ctx.funnelStage}.` : ""),
    previousOutput: chainOutput || "",
  };
}

function getChainKey(department: DepartmentId, intent: Intent): string {
  const key = `${department}_${intent}`;
  if (CHAINS[key]) return key;
  const fallback = `${department}_general`;
  if (CHAINS[fallback]) return fallback;
  return `${department}_${intent}`;
}

export async function processMessage(ctx: MessageCtx): Promise<BrainResult> {
  const start = Date.now();
  const fallbackDept: DepartmentId = ctx.isWorker ? "member_success" : "sales";

  const { intent, department } = await detectIntent(ctx.text, ctx, fallbackDept);

  const chainKey = getChainKey(department, intent);
  const agentIds = CHAINS[chainKey] || [];

  // If no chain defined, fall back to priority-based agent selection
  let selectedAgents: AgentDef[];
  if (agentIds.length === 0) {
    const allDeptAgents = getAgentsByDepartment(department);
    selectedAgents = allDeptAgents.filter((a) => {
      try {
        const condition = a.when.replace("{{intent}}", `'${intent}'`).replace("{{role}}", `'${ctx.role}'`);
        return new Function("intent", "role", `return ${condition}`)(intent, ctx.role);
      } catch { return true; }
    });
    selectedAgents.sort((a, b) => b.priority - a.priority);
    selectedAgents = selectedAgents.slice(0, 3);
  } else {
    selectedAgents = agentIds.map((id) => findAgent(id)?.agent).filter(Boolean) as AgentDef[];
  }

  if (selectedAgents.length === 0) {
    const fallbackResult = await callAI(
      { messages: [{ role: "system", content: `You are a helpful Jobayer Group Career assistant. Reply in ${ctx.language === "bn" ? "Bengali" : "English"}.` }, { role: "user", content: ctx.text }] },
      400, "gemma-4-26b", "openrouter"
    );
    return {
      text: fallbackResult.text, model: fallbackResult.model, tokens: fallbackResult.tokens,
      agentsUsed: ["fallback"], department, intent, ms: Date.now() - start,
    };
  }

  // ── Sequential chain execution ──
  const agentsUsed: string[] = [];
  let chainContext = "";
  let mainModel = selectedAgents[0]?.id || "gemma-4-26b";

  for (const agent of selectedAgents) {
    try {
      const contextVars = buildContext(ctx, intent, chainContext);
      const agentPrompt = buildAgentPrompt(agent, contextVars);
      const output = await executeAgent(agent, agentPrompt, ctx.text);

      chainContext += `\n[${agent.name}]\n${output.text}`;
      agentsUsed.push(agent.id);
    } catch {
      chainContext += `\n[${agent.name}]: (unavailable)`;
    }
  }

  // ── Final response composition ──
  const dept = DEPARTMENTS[department];
  const compositionPrompt = `You are the ${dept.name} lead at Jobayer Group Career.
Department: ${dept.nameBn}
Role: ${dept.description}

## Context
${Object.entries(buildContext(ctx, intent)).map(([k, v]) => `${k}: ${v}`).join("\n")}

## Chain Output
${chainContext}

## Your Task
Compose a final response to the customer's message in ${ctx.language === "bn" ? "Bengali" : "English"}.
Use the chain outputs above. Be natural, warm, and helpful.
If there are multiple outputs, weave them into one coherent response.
Keep it under 400 words. If complaint → be empathetic first. If purchase → guide to next step.`;

  try {
    const result = await callAI(
      { messages: [{ role: "system", content: compositionPrompt }, { role: "user", content: ctx.text }] },
      600, "llama-3.3-70b", "openrouter"
    );

    return {
      text: result.text, model: result.model, tokens: result.tokens,
      agentsUsed, department, intent, ms: Date.now() - start,
    };
  } catch (e) {
    const fallbackResult = await callAI(
      { messages: [{ role: "system", content: `You are a helpful Jobayer Group assistant. Reply in ${ctx.language === "bn" ? "Bengali" : "English"}.` }, { role: "user", content: ctx.text }] },
      400, "gemma-4-26b", "openrouter"
    );

    return {
      text: fallbackResult.text, model: fallbackResult.model, tokens: fallbackResult.tokens,
      agentsUsed, department, intent, ms: Date.now() - start,
    };
  }
}
