-- 100% Free AI Models — OpenRouter + OpenCode (verified July 2026)
-- Clears old (paid) models, seeds only verified free models.

DELETE FROM ai_models;

-- ─── OpenRouter Free Models (21 verified free, pricing=0) ───

INSERT INTO ai_models (model_id, name, provider, tier, is_active) VALUES
-- Tier 1: Best quality
('openrouter/free',                                'Free Models Router (Auto)',            'openrouter', 1, 1),
('meta-llama/llama-3.3-70b-instruct:free',         'Llama 3.3 70B Instruct Free',          'openrouter', 1, 1),
('nousresearch/hermes-3-llama-3.1-405b:free',      'Hermes 3 405B Instruct Free',          'openrouter', 1, 1),
('nvidia/nemotron-3-ultra-550b-a55b:free',          'Nemotron 3 Ultra 550B Free',           'openrouter', 1, 1),

-- Tier 2: Strong general-purpose
('google/gemma-4-31b-it:free',                      'Gemma 4 31B Free',                    'openrouter', 2, 1),
('qwen/qwen3-coder:free',                           'Qwen3 Coder 480B A35B Free',          'openrouter', 2, 1),
('qwen/qwen3-next-80b-a3b-instruct:free',           'Qwen3 Next 80B A3B Free',             'openrouter', 2, 1),
('nvidia/nemotron-3-super-120b-a12b:free',          'Nemotron 3 Super 120B Free',          'openrouter', 2, 1),

-- Tier 3: Good balance
('google/gemma-4-26b-a4b-it:free',                  'Gemma 4 26B A4B Free',                'openrouter', 3, 1),
('nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', 'Nemotron 3 Nano Omni Free',        'openrouter', 3, 1),
('nvidia/nemotron-3-nano-30b-a3b:free',             'Nemotron 3 Nano 30B Free',            'openrouter', 3, 1),
('cognitivecomputations/dolphin-mistral-24b-venice-edition:free', 'Dolphin Mistral 24B Free', 'openrouter', 3, 1),
('cohere/north-mini-code:free',                     'North Mini Code Free',                 'openrouter', 3, 1),
('openai/gpt-oss-20b:free',                         'GPT-OSS 20B Free',                    'openrouter', 3, 1),
('poolside/laguna-m.1:free',                        'Laguna M.1 Free',                     'openrouter', 3, 1),

-- Tier 4: Fast/lightweight
('meta-llama/llama-3.2-3b-instruct:free',           'Llama 3.2 3B Instruct Free',          'openrouter', 4, 1),
('nvidia/nemotron-nano-12b-v2-vl:free',             'Nemotron Nano 12B VL Free',           'openrouter', 4, 1),
('nvidia/nemotron-nano-9b-v2:free',                 'Nemotron Nano 9B Free',               'openrouter', 4, 1),
('nvidia/nemotron-3.5-content-safety:free',         'Nemotron 3.5 Content Safety Free',    'openrouter', 4, 1),
('poolside/laguna-xs-2.1:free',                     'Laguna XS 2.1 Free',                  'openrouter', 4, 1),

-- Tier 5: Last resort
('tencent/hy3:free',                                'Tencent Hy3 Free',                    'openrouter', 5, 1);

-- ─── OpenCode Free Models (6 verified) ───

INSERT INTO ai_models (model_id, name, provider, tier, is_active) VALUES
('deepseek-v4-flash-free',   'DeepSeek V4 Flash Free (OpenCode)',  'opencode', 1, 1),
('nemotron-3-ultra-free',    'Nemotron 3 Ultra Free (OpenCode)',   'opencode', 2, 1),
('mimo-v2.5-free',           'MiMo V2.5 Free (OpenCode)',          'opencode', 3, 1),
('north-mini-code-free',     'North Mini Code Free (OpenCode)',    'opencode', 3, 1),
('hy3-free',                 'Hy3 Free (OpenCode)',                'opencode', 4, 1),
('big-pickle',               'Big Pickle Free (OpenCode)',         'opencode', 4, 1);

-- API keys should be added via the AI Settings page in the dashboard.
