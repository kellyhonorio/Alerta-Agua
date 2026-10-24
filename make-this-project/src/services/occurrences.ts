/**
 * Data access layer. Today: local demo store (browser storage).
 * Replace these functions with APS Cloud queries without touching the UI.
 */
import { useEffect, useState } from "react";
import { computeStatus } from "@/lib/lifecycle";
import type { Confirmation, ConfirmationKind, Occurrence, OccurrenceStatus } from "@/types/occurrence";

const KEY = "alerta-agua:v1";

export interface OccurrenceView extends Occurrence {
  status: OccurrenceStatus;
  confirmacoesAtiva: number;
  confirmacoesNormalizada: number;
}

interface Store {
  occurrences: Occurrence[];
  confirmations: Confirmation[];
}

function hoursAgo(h: number) {
  return new Date(Date.now() - h * 3600_000).toISOString();
}

function demoSeed(): Store {
  const base = (o: Partial<Occurrence> & Pick<Occurrence, "id" | "titulo" | "latitude" | "longitude" | "gravidade" | "tipo" | "endereco">, h: number): Occurrence => ({
    descricao: "Registro fictício para demonstração da plataforma.",
    createdAt: hoursAgo(h),
    updatedAt: hoursAgo(h),
    photos: [],
    autor: "Usuário demonstração",
    isDemo: true,
    ...o,
  });
  const occurrences = [
    base({ id: "demo-1", titulo: "Via alagada próxima ao viaduto", tipo: "via_inundada", gravidade: "alto", endereco: "Região central (exemplo)", latitude: -23.5489, longitude: -46.6388 }, 1),
    base({ id: "demo-2", titulo: "Acúmulo de água na esquina", tipo: "alagamento", gravidade: "moderado", endereco: "Zona oeste (exemplo)", latitude: -23.5615, longitude: -46.6912 }, 3),
    base({ id: "demo-3", titulo: "Poças extensas na calçada", tipo: "alagamento", gravidade: "baixo", endereco: "Zona sul (exemplo)", latitude: -23.5869, longitude: -46.6577 }, 5),
    base({ id: "demo-4", titulo: "Córrego transbordando", tipo: "enchente", gravidade: "alto", endereco: "Zona leste (exemplo)", latitude: -23.5402, longitude: -46.5765 }, 2),
    base({ id: "demo-5", titulo: "Rua com água acima do meio-fio", tipo: "via_inundada", gravidade: "moderado", endereco: "Zona norte (exemplo)", latitude: -23.5003, longitude: -46.6249 }, 20),
  ];
  const confirmations: Confirmation[] = [
    { id: "c1", occurrenceId: "demo-1", kind: "ativa", createdAt: hoursAgo(0.5) },
    { id: "c2", occurrenceId: "demo-1", kind: "ativa", createdAt: hoursAgo(0.3) },
    { id: "c3", occurrenceId: "demo-2", kind: "ativa", createdAt: hoursAgo(2) },
    { id: "c4", occurrenceId: "demo-4", kind: "ativa", createdAt: hoursAgo(1) },
  ];
  return { occurrences, confirmations };
}

let cache: Store | null = null;
const listeners = new Set<() => void>();

function load(): Store {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Store) : demoSeed();
  } catch {
    cache = demoSeed();
  }
  return cache;
}

function save(s: Store) {
  cache = s;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    throw new Error("Armazenamento local cheio. Tente fotos menores.");
  }
  listeners.forEach((l) => l());
}

function toView(s: Store, o: Occurrence): OccurrenceView {
  const cs = s.confirmations.filter((c) => c.occurrenceId === o.id);
  return {
    ...o,
    status: computeStatus(o, cs),
    confirmacoesAtiva: cs.filter((c) => c.kind === "ativa").length,
    confirmacoesNormalizada: cs.filter((c) => c.kind === "normalizada").length,
  };
}

export function listOccurrences(): OccurrenceView[] {
  const s = load();
  return s.occurrences
    .map((o) => toView(s, o))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOccurrence(id: string): OccurrenceView | null {
  const s = load();
  const o = s.occurrences.find((x) => x.id === id);
  return o ? toView(s, o) : null;
}

export type NewOccurrence = Omit<Occurrence, "id" | "updatedAt" | "isDemo" | "autor">;

export async function createOccurrence(input: NewOccurrence): Promise<string> {
  await new Promise((r) => setTimeout(r, 500));
  const s = load();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  save({ ...s, occurrences: [...s.occurrences, { ...input, id, updatedAt: now, isDemo: true, autor: "Visitante (modo demonstração)" }] });
  return id;
}

const VOTED_KEY = "alerta-agua:voted";
export function hasVoted(id: string): boolean {
  try {
    return (JSON.parse(localStorage.getItem(VOTED_KEY) ?? "[]") as string[]).includes(id);
  } catch {
    return false;
  }
}

export function confirmOccurrence(id: string, kind: ConfirmationKind) {
  if (hasVoted(id)) throw new Error("Você já enviou uma confirmação para este relato.");
  const s = load();
  save({ ...s, confirmations: [...s.confirmations, { id: crypto.randomUUID(), occurrenceId: id, kind, createdAt: new Date().toISOString() }] });
  const voted = JSON.parse(localStorage.getItem(VOTED_KEY) ?? "[]") as string[];
  localStorage.setItem(VOTED_KEY, JSON.stringify([...voted, id]));
}

/** Subscribes to the store; returns null until loaded in the browser. */
export function useOccurrences(): OccurrenceView[] | null {
  const [data, setData] = useState<OccurrenceView[] | null>(null);
  useEffect(() => {
    const update = () => setData(listOccurrences());
    const t = setTimeout(update, 250);
    listeners.add(update);
    return () => {
      clearTimeout(t);
      listeners.delete(update);
    };
  }, []);
  return data;
}

export function useOccurrence(id: string): OccurrenceView | null | undefined {
  const all = useOccurrences();
  if (all === null) return undefined;
  return all.find((o) => o.id === id) ?? null;
}
