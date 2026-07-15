// ── Circuit breaker for failing agents/models ──
interface CircuitState {
  failures: number;
  lastFailure: number;
  open: boolean;
  openedAt: number;
}

const circuits = new Map<string, CircuitState>();
const THRESHOLD = 3;         // 3 failures → open circuit
const RESET_MS = 60_000;     // 1 minute before half-open
const COOLDOWN_MS = 30_000;  // 30s between state changes

export function recordFailure(key: string): void {
  const now = Date.now();
  const state = circuits.get(key) || { failures: 0, lastFailure: 0, open: false, openedAt: 0 };
  state.failures++;
  state.lastFailure = now;
  if (state.failures >= THRESHOLD && !state.open) {
    state.open = true;
    state.openedAt = now;
  }
  circuits.set(key, state);
}

export function recordSuccess(key: string): void {
  const state = circuits.get(key);
  if (state) {
    state.failures = 0;
    state.open = false;
    state.openedAt = 0;
  }
}

export function isCircuitOpen(key: string): boolean {
  const state = circuits.get(key);
  if (!state || !state.open) return false;
  // Auto-reset after RESET_MS
  if (Date.now() - state.openedAt > RESET_MS) {
    state.open = false;
    state.failures = 0;
    state.openedAt = 0;
    return false;
  }
  return true;
}

export function getCircuitSummary(): Record<string, { open: boolean; failures: number; lastFailure: string }> {
  const summary: Record<string, any> = {};
  for (const [key, state] of circuits) {
    if (state.failures > 0) {
      summary[key] = {
        open: state.open,
        failures: state.failures,
        lastFailure: new Date(state.lastFailure).toISOString(),
      };
    }
  }
  return summary;
}

export function resetCircuit(key: string): void {
  circuits.delete(key);
}

export function resetAllCircuits(): void {
  circuits.clear();
}
