# Alerta Água

Aplicativo web para registrar, visualizar e acompanhar ocorrências de alagamentos e enchentes em diferentes regiões. A plataforma permite que a comunidade consulte relatos em tempo real, filtre por gravidade e status, e visualize os pontos em um mapa interativo.

## ✨ Funcionalidades

- Mapa interativo com pontos de ocorrências
- Registro de relatos com endereço, gravidade e tipo da situação
- Filtros por gravidade, status e período
- Busca por endereço ou região
- Dashboard com estatísticas gerais
- Cards informativos sobre condições climáticas
- Interface responsiva para desktop e mobile
- Estrutura preparada para evolução para backend real ou integração com banco de dados

## 🧩 Tecnologias utilizadas

- React
- TypeScript
- Vite
- TanStack Router
- Tailwind CSS
- Leaflet
- Recharts
- Vitest
- shadcn/ui

## 🏗️ Estrutura do projeto

```bash
src/
├── components/
├── hooks/
├── lib/
├── routes/
├── services/
├── test/
├── types/
├── router.tsx
├── server.ts
├── start.ts
├── styles.css
└── routeTree.gen.ts
```

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 18+
- npm ou bun

### Instalação

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível no endereço padrão do Vite, normalmente:

```bash
http://localhost:5173
```

### Build para produção

```bash
npm run build
```

### Testes

```bash
npm run test
```

## 📌 Observação

O projeto atualmente usa armazenamento local para simular dados de ocorrências e confirmações, o que facilita a demonstração e testes iniciais. Em uma versão futura, o ideal é substituir esse armazenamento por uma API e banco de dados reais.

## 📝 Licença

Este projeto está disponível para fins acadêmicos e de desenvolvimento.

## 👤 Autor

Seu nome ou nome da equipe aqui.

---

Se quiser, pode adicionar uma seção com:
- capturas de tela
- arquitetura do sistema
- instruções para deploy
- link do protótipo ou demo
