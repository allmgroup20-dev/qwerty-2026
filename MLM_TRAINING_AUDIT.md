# AI-WhatsApp Training Modules — Filtered Plan

## Principle
Only modules that AI can **directly deliver or significantly assist with** via WhatsApp chat are included. Pure human-physical activities (stage speaking, events, in-person demos) are excluded.

---

## ✅ IN SCOPE — Modules AI Can Implement via WhatsApp

### CORE (already present — needs no work)

| # | Module | AI Capability | Current Status |
|---|--------|---------------|----------------|
| **M2** | Product Knowledge | Answer product/price questions from DB | ✅ **Present** |
| **M5** | Relationship Building | Follow-up, trust building, rapport via chat | ✅ **Present** |
| **M6** | Sales Psychology | Apply loss aversion, scarcity, social proof etc. | ✅ **Present** |
| **M10** | Objection Handling | Handle 11+ objection types via chat | ✅ **Present** |
| **M17** | Customer Service | Complaint handling, support, follow-up | ✅ **Present** |
| **M22** | Motivation | Send motivational messages, success stories | ✅ **Present** |

### GAP 1: Sales Funnel & Prospecting (needs new stage scripts)

| # | Module | What AI Will Do | Current | Needed |
|---|--------|----------------|---------|--------|
| **M1** | Business Model Explanation | Explain company, opportunity, income sources to prospects | 🔶 Partial | Company history/vision/mission, "what is this business" knowledge |
| **M4** | Prospecting | Generate lead gen scripts, guide warm/cold outreach | 🔶 Partial | Cold contact scripts, warm market strategy, social media lead tips |
| **M7** | Sales Process (12-step) | Guide prospect through full funnel via chat | 🔶 Partial | Add demo explanation, delivery process, after-sales flow |
| **M9** | Closing Techniques | Apply 6 closing techniques in conversation | 🔶 Partial | Add Summary Close, Trial Close scripts |
| **M11** | Team Building (Recruitment) | Guide member to invite others, onboard new members | 🔶 Partial | Add "how to present opportunity" scripts, interview tips |

### GAP 2: Training & Coaching (needs new knowledge entries + prompts)

| # | Module | What AI Will Do | Current | Needed |
|---|--------|----------------|---------|--------|
| **M3** | Communication Skills | Coach on tone, listening, empathy via chat | 🔶 Partial | Create "Communication Skills" training module |
| **M12** | Leadership Development | Coach on team building, motivation, mentoring | 🔶 Partial | Add delegation, conflict management tips |
| **M19** | Goal Setting | Guide SMART goal setting for income/sales | 🔶 Partial | Structured goal-setting training module |
| **M20** | Financial Literacy | Explain commission, budget, saving, expense tracking | 🔶 Partial | Add budget/saving/expense tracking knowledge |
| **M21** | Ethics & Compliance | Teach ethical selling, legal compliance | 🔶 Partial | Add local law compliance, company policy knowledge |
| **M24** | Negotiation Skills | Coach on win-win negotiation, price handling | 🔶 Partial | Add win-win framework |
| **M28** | Problem Solving | Guide customer/team problem analysis | 🔶 Partial | Add team problem-solving, sales decline recovery |
| **M29** | Advanced Sales | Upsell, cross-sell, repeat sales guidance | 🔶 Partial | Add cross-sell scripts, high-ticket sales tips |
| **M30** | Continuous Learning | Recommend books, assess skills, encourage learning | 🔶 Partial | Add skill assessment, learning path guidance |

### GAP 3: Marketing & Branding (via chat coaching — AI gives tips, not doing it)

| # | Module | What AI Will Do | Current | Needed |
|---|--------|----------------|---------|--------|
| **M14** | Personal Branding | Give tips on social media branding, image building | ❌ Missing | Create "Personal Branding" knowledge + tips |
| **M15** | Digital Marketing | Give tips on Facebook/WhatsApp/YouTube marketing | ❌ Missing | Create "Digital Marketing" knowledge + strategies |
| **M16** | Content Creation | Give caption ideas, content tips, copywriting help | ❌ Missing | Create "Content Creation" knowledge |
| **M18** | Time Management | Guide daily/weekly planning, productivity tips | ❌ Missing | Create "Time Management" training module |
| **M25** | Business Expansion | Guide new market entry, team growth strategies | ❌ Missing | Create "Business Expansion" knowledge |

### GAP 4: Operational Automation (AI does directly)

| # | Module | What AI Will Do | Current | Needed |
|---|--------|----------------|---------|--------|
| **M13** | Team Management | Track team progress, send reminders, target updates | ❌ Missing | Automated team tracking + notification system |
| **M26** | Data Management | CRM — AI already has profile, history, lead system | ✅ Present | Add "how to use data" training for members |

---

## ❌ OUT OF SCOPE — Human-Only Activities (not needed)

| Module | Reason |
|--------|--------|
| **M8** Presentation Skills | Stage/group/Zoom demos are physical human activities. AI can't present. |
| **M23** Public Speaking | Stage fear, audience engagement are physical. Not applicable to WhatsApp chat. |
| **M27** Event Management | Physical events (home meetings, seminars) are human-organized. AI can't run events. |

---

## REVISED IMPLEMENTATION PLAN

### Scope: 21 in-scope modules → 9 need improvement, 6 are new

| Priority | Module | What's Missing | Type |
|----------|--------|----------------|------|
| **P0** | **M1** | Company history, vision, mission, business explanation | Knowledge Entry |
| **P0** | **M4** | Cold contact scripts, warm market strategy | Stage Scripts |
| **P0** | **M7** | Demo explanation, delivery, after-sales process | Stage Scripts |
| **P0** | **M9** | Summary Close, Trial Close scripts | Stage Scripts |
| **P0** | **M11** | Business opportunity presentation scripts, interview tips | Stage Scripts |
| **P1** | **M3** | Communication skills training module | Training Prompts |
| **P1** | **M12** | Delegation, conflict management coaching | Knowledge Entry |
| **P1** | **M19** | SMART goal training module | Training Prompts |
| **P1** | **M20** | Budget, saving, expense tracking knowledge | Knowledge Entry |
| **P1** | **M21** | Local law compliance, company policy | Knowledge Entry |
| **P1** | **M24** | Win-win negotiation framework | Knowledge Entry |
| **P1** | **M28** | Team problem-solving, sales decline recovery | Knowledge Entry |
| **P1** | **M29** | Cross-sell scripts, high-ticket sales tips | Stage Scripts |
| **P1** | **M30** | Skill assessment, learning path | Training Prompts |
| **P2** | **M14** | Personal branding tips | Knowledge Entry |
| **P2** | **M15** | Digital marketing strategies | Knowledge Entry |
| **P2** | **M16** | Content creation tips, caption templates | Knowledge Entry |
| **P2** | **M18** | Time management module | Training Prompts |
| **P2** | **M25** | Business expansion strategies | Knowledge Entry |
| **P3** | **M13** | Team tracking automation | Code (scheduler/notifications) |

### Files to Create/Modify

| File | Action | Content |
|------|--------|---------|
| `src/lib/ai/seed-data/all-entries.ts` | **Modify** | Add ~18 new knowledge entries (P0-P2) |
| `src/lib/ai/prompts/stage-scripts.ts` | **Create** | Stage-based scripts (P0 modules) |
| `src/lib/ai/prompts/training-modules.ts` | **Create** | Structured training delivery prompts (P1) |
| `src/lib/ai/brain/orchestrator.ts` | **Modify** | Inject stage-scripts + training-modules into system prompt |
| `src/lib/ai/conversation-rules.ts` | **Modify** | Add missing objection reframes, communication tips |

### Effort Estimate (Revised)

| Scope | New Files | Modified Files | Lines | Days |
|-------|-----------|---------------|-------|------|
| P0 (Stage Scripts + Knowledge) | 1 | 2 | ~400 | 2 |
| P1 (Training + Knowledge) | 1 | 2 | ~350 | 2 |
| P2 (Knowledge Entries) | 0 | 1 | ~200 | 1 |
| P3 (Team Tracking) | 1 | 0 | ~100 | 0.5 |
| **Total** | **3 new** | **3 modified** | **~1,050** | **~5 days** |

---

## How to Proceed

1. **আপনি কি এই ফিল্টারড প্ল্যানটি approve করেন?**
2. **কোনো Priority Level পরিবর্তন করতে চান?** (যেমন P2-কে P0 করতে চান?)
3. **কোনো Specific Module বাদ দিতে চান বা যোগ করতে চান?**

আপনার সিদ্ধান্ত জানালে আমি Phase-by-Phase implement করা শুরু করব।
