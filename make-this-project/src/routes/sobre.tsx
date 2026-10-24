import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Panel } from "@/components/layout/PageShell";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o projeto — Alerta Água" },
      { name: "description", content: "Conheça o Alerta Água, plataforma colaborativa de monitoramento de alagamentos." },
      { property: "og:title", content: "Sobre o projeto — Alerta Água" },
      { property: "og:description", content: "Conheça o Alerta Água, plataforma colaborativa de monitoramento de alagamentos." },
    ],
  }),
  component: () => (
    <PageShell title="Sobre o projeto">
      <Panel className="space-y-4 leading-relaxed">
        <p>O <strong>Alerta Água</strong> é uma plataforma colaborativa em que moradores registram e confirmam alagamentos por meio de relatos geolocalizados, ajudando a comunidade a identificar áreas de risco.</p>
        <h2 className="text-lg font-bold text-navy">Como funciona</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Todo relato começa como <em>pendente de confirmação</em>.</li>
          <li>Quando outras pessoas confirmam, ele passa a <em>ativo</em>.</li>
          <li>Com confirmações de que a situação acabou, vira <em>normalizado</em>.</li>
          <li>Sem novas confirmações por um período, é marcado como <em>expirado</em> — o que não garante que o local esteja seguro.</li>
        </ul>
        <p className="text-sm text-muted-foreground">O Alerta Água não é um serviço oficial de emergência e não substitui os alertas da Defesa Civil e demais autoridades.</p>
      </Panel>
    </PageShell>
  ),
});
