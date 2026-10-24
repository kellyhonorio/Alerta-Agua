import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageShell({ title, subtitle, children, className }: { title: string; subtitle?: string; children: ReactNode; className?: string }) {
  return (
    <main className={cn("mx-auto w-full max-w-3xl flex-1 px-3 py-6 sm:px-4 sm:py-8", className)}>
      <h1 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      <div className="mt-4 sm:mt-6">{children}</div>
    </main>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl border bg-card p-5 shadow-card", className)}>{children}</section>;
}

export function PendingIntegration({ feature }: { feature: string }) {
  return (
    <div role="status" className="rounded-xl border border-sev-low bg-sev-low/15 p-4 text-sm text-navy">
      <strong>{feature}: pendente de integração.</strong> Esta função será ativada quando o backend (APS Cloud) for conectado. Nenhum login é simulado.
    </div>
  );
}
