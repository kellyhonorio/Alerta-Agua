import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Panel, PendingIntegration } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Alerta Água" },
      { name: "description", content: "Enviaremos um link para redefinir sua senha." },
      { property: "og:title", content: "Recuperar senha — Alerta Água" },
      { property: "og:description", content: "Enviaremos um link para redefinir sua senha." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell title="Recuperar senha" subtitle="Enviaremos um link para redefinir sua senha." className="max-w-md">
      <Panel className="space-y-4">
        <PendingIntegration feature="Recuperação de senha" />
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5"><Label htmlFor="f0">E-mail</Label><Input id="f0" type="email" disabled /></div>
          <Button className="w-full" disabled>Recuperar senha</Button>
        </form>
        <p className="mt-4 text-sm"><Link to="/login" className="text-primary">Voltar ao login</Link></p>
      </Panel>
    </PageShell>
  );
}
