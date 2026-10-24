import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Panel, PendingIntegration } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Alerta Água" },
      { name: "description", content: "Seus dados e relatos no Alerta Água." },
      { property: "og:title", content: "Meu perfil — Alerta Água" },
      { property: "og:description", content: "Seus dados e relatos no Alerta Água." },
    ],
  }),
  component: () => (
    <PageShell title="Meu perfil" className="max-w-md">
      <Panel className="space-y-4">
        <PendingIntegration feature="Perfil do usuário" />
        <p className="text-sm text-muted-foreground">Após a conexão, aqui aparecerão seu nome, e-mail, seus relatos e a opção de sair da conta.</p>
        <Button asChild variant="outline"><Link to="/login">Ir para o login</Link></Button>
      </Panel>
    </PageShell>
  ),
});
