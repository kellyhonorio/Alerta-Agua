import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Panel, PendingIntegration } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — Alerta Água" },
      { name: "description", content: "Cadastre-se para registrar e confirmar relatos." },
      { property: "og:title", content: "Criar conta — Alerta Água" },
      { property: "og:description", content: "Cadastre-se para registrar e confirmar relatos." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell title="Criar conta" subtitle="Cadastre-se para registrar e confirmar relatos." className="max-w-md">
      <Panel className="space-y-4">
        <PendingIntegration feature="Cadastro" />
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5"><Label htmlFor="f0">Nome</Label><Input id="f0" type="text" disabled /></div>
          <div className="space-y-1.5"><Label htmlFor="f1">E-mail</Label><Input id="f1" type="email" disabled /></div>
          <div className="space-y-1.5"><Label htmlFor="f2">Senha</Label><Input id="f2" type="password" disabled /></div>
          <Button className="w-full" disabled>Criar conta</Button>
        </form>
        <p className="mt-4 text-sm">Já tem conta? <Link to="/login" className="text-primary">Entrar</Link></p>
      </Panel>
    </PageShell>
  );
}
