import { describe, expect, it } from "vitest";
import { computeStatus } from "./lifecycle";

const now = new Date("2026-10-18T12:00:00Z");
const ago = (h: number) => new Date(now.getTime() - h * 3600_000).toISOString();

describe("computeStatus", () => {
  it("new report without confirmations is pending, not active", () => {
    expect(computeStatus({ createdAt: ago(1) }, [], now)).toBe("pendente");
  });
  it("one 'still exists' confirmation makes it active", () => {
    expect(computeStatus({ createdAt: ago(1) }, [{ kind: "ativa", createdAt: ago(0.5) }], now)).toBe("ativa");
  });
  it("expires after 12h without activity", () => {
    expect(computeStatus({ createdAt: ago(13) }, [], now)).toBe("expirada");
  });
  it("needs 2 normalized votes outnumbering active ones", () => {
    const n = { kind: "normalizada" as const, createdAt: ago(1) };
    expect(computeStatus({ createdAt: ago(2) }, [n], now)).toBe("pendente");
    expect(computeStatus({ createdAt: ago(2) }, [n, n], now)).toBe("normalizada");
  });
});
