import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Panel, PendingIntegration } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Alerta Água" },
      { name: "description", content: "Acesse sua conta do Alerta Água." },
      { property: "og:title", content: "Entrar — Alerta Água" },
      { property: "og:description", content: "Acesse sua conta do Alerta Água." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell title="Entrar" subtitle="Acesse sua conta do Alerta Água." className="max-w-md">
      <Panel className="space-y-4">
        <PendingIntegration feature="Login" />
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5"><Label htmlFor="f0">E-mail</Label><Input id="f0" type="email" disabled /></div>
          <div className="space-y-1.5"><Label htmlFor="f1">Senha</Label><Input id="f1" type="password" disabled /></div>
          <Button className="w-full" disabled>Entrar</Button>
        </form>
        <p className="mt-4 text-sm"><Link to="/recuperar-senha" className="text-primary">Esqueci minha senha</Link> · <Link to="/cadastro" className="text-primary">Criar conta</Link></p>
      </Panel>
    </PageShell>
  );
}
