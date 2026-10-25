# Documento Técnico do Projeto: Sistema de Registro e Monitoramento de Ocorrências de Alagamento

## 1. Introdução

Este projeto consiste em uma aplicação web desenvolvida com foco na coleta, visualização e acompanhamento de registros de alagamentos, enchentes e vias inundadas em diferentes localidades. O sistema foi concebido como uma solução de apoio à comunidade urbana, permitindo que usuários reportem eventos de risco hidroambiental e validem a ocorrência por meio de confirmações colaborativas.

O principal objetivo da aplicação é possibilitar a identificação de áreas com maior vulnerabilidade à inundação, oferecendo uma base de dados georreferenciada e um mecanismo de classificação do estado da ocorrência em função do tempo e da interação da comunidade.

A solução foi implementada em formato de MVP, com suporte tanto a persistência em banco de dados relacional via Supabase quanto a operação em ambiente local para fins de demonstração e testes.

---

## 2. Objetivo do Sistema

O sistema busca atender à necessidade de registrar ocorrências geolocalizadas relacionadas a eventos de inundação, com foco em:

- localização do problema;
- classificação do tipo de evento;
- avaliação de gravidade;
- confirmação por parte da comunidade;
- acompanhamento do estado da ocorrência ao longo do tempo.

Dessa forma, o sistema não apenas coleta dados, mas também organiza informações de forma a auxiliá-la na análise de padrões e na percepção de risco em áreas específicas.

---

## 3. Justificativa e Contextualização

Em contextos urbanos, especialmente em regiões sujeitas a chuvas intensas, a ausência de informações atualizadas sobre pontos críticos pode comprometer a mobilidade, a segurança pública e a adoção de medidas preventivas. O projeto propõe uma abordagem participativa e geolocalizada para o mapeamento dessas ocorrências, permitindo a consolidação de dados em uma base compartilhada.

A solução combina aspectos de geolocalização, dados públicos e colaboração social, oferecendo uma plataforma que pode servir como base para estudos, alertas comunitários e ações de monitoramento local.

---

## 4. Tecnologias Utilizadas

A aplicação foi desenvolvida empregando uma stack moderna e modular, composta por:

- React 19;
- TypeScript;
- Vite;
- TanStack Router;
- TanStack Query;
- Tailwind CSS;
- Supabase;
- Leaflet;
- Recharts;
- Vitest;
- shadcn/ui.

Essas tecnologias foram escolhidas para garantir produtividade no desenvolvimento, modularidade da interface, suporte ao gerenciamento de estado e capacidade de integração com serviços externos de persistência e autenticação.

---

## 5. Arquitetura do Sistema

A arquitetura do projeto pode ser compreendida em quatro camadas principais:

1. Camada de apresentação: interfaces e rotas da aplicação;
2. Camada de domínio: tipos, regras de negócio e validações;
3. Camada de serviços: acesso a dados e lógica de persistência;
4. Camada de infraestrutura: banco de dados Supabase e armazenamento local alternativo.

A lógica principal está concentrada em arquivos como:

- `src/services/occurrences.ts` – acesso e manipulação dos dados de ocorrências;
- `src/lib/lifecycle.ts` – cálculo do status da ocorrência;
- `src/lib/supabase.ts` – configuração do cliente do Supabase;
- `src/types/occurrence.ts` – definição dos tipos de domínio.

---

## 6. Estrutura do Projeto

A organização do projeto é a seguinte:

```bash
src/
├── components/
│   ├── layout/
│   ├── map/
│   ├── occurrence/
│   └── ui/
├── hooks/
├── lib/
│   ├── lifecycle.ts
│   ├── supabase.ts
│   └── ...
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── login.tsx
│   ├── cadastro.tsx
│   ├── registrar.tsx
│   ├── perfil.tsx
│   ├── seguranca.tsx
│   ├── sobre.tsx
│   └── ...
├── services/
│   └── occurrences.ts
├── test/
├── types/
│   └── occurrence.ts
├── router.tsx
├── server.ts
├── start.ts
├── styles.css
└── routeTree.gen.ts
```

### 6.1. Componentes da estrutura

#### `components/`
Contém blocos de interface reutilizáveis, como cabeçalhos, cards, formulários, mapas e elementos visuais padronizados.

#### `routes/`
Armazena as páginas da aplicação. O roteamento é baseado em arquivos, seguindo a convenção do TanStack Router.

#### `services/`
Responsável pela interação com a camada de dados. É o módulo que decide se a aplicação fará uso do Supabase ou do armazenamento local.

#### `lib/`
Agrupa utilitários e regras de negócio, especialmente o cálculo de status e a configuração do cliente de conexão com o banco.

#### `types/`
Define as estruturas de dados do domínio, padronizando os tipos usados na aplicação.

---

## 7. Modelagem de Dados

A persistência do sistema foi modelada em duas entidades principais:

1. `occurrences` – registros de ocorrência;
2. `confirmations` – registros de confirmação associada a uma ocorrência.

### 7.1. Tabela `occurrences`

A tabela `occurrences` armazena os dados do relato reportado pela comunidade. Cada linha representa uma ocorrência georreferenciada e classificada conforme tipo e severidade.

Os principais campos são:

- `id`: identificador único da ocorrência;
- `user_id`: identificador do usuário que criou o registro;
- `titulo`: título do relato;
- `descricao`: descrição detalhada da situação;
- `tipo`: categoria da ocorrência;
- `gravidade`: nível de severidade;
- `endereco`: endereço ou referência geográfica;
- `latitude`: coordenada de latitude;
- `longitude`: coordenada de longitude;
- `autor`: autor do relato;
- `photos`: lista de fotos associadas;
- `is_demo`: indicador de dado de demonstração;
- `created_at`: data de criação;
- `updated_at`: data da última atualização.

### 7.2. Tabela `confirmations`

A tabela `confirmations` registra a validação da ocorrência pela comunidade. Ela permite que cada relato seja confirmado ou normalizado com base em evidências ou observações locais.

Os principais campos são:

- `id`: identificador único da confirmação;
- `occurrence_id`: referência à ocorrência relacionada;
- `kind`: tipo de confirmação;
- `created_at`: timestamp da confirmação.

### 7.3. Tipos de domínio do sistema

No arquivo `src/types/occurrence.ts`, os tipos definidos para o sistema são:

- `OccurrenceType`: `alagamento | enchente | via_inundada | outro`;
- `Severity`: `baixo | moderado | alto`;
- `ConfirmationKind`: `ativa | normalizada`.

Esses valores demonstram uma estrutura de classificação funcional e coerente com o propósito do sistema.

---

## 8. Relacionamentos e Integridade Referencial

A modelagem estabelece uma relação entre usuários e ocorrências, além de uma relação entre ocorrências e confirmações.

A estrutura de relacionamento é a seguinte:

- `auth.users` → `occurrences` : um usuário pode criar várias ocorrências;
- `occurrences` → `confirmations` : uma ocorrência pode receber múltiplas confirmações.

As chaves estrangeiras são implementadas da seguinte forma:

- `user_id uuid references auth.users(id)`;
- `occurrence_id uuid references occurrences(id)`.

A política `on delete cascade` assegura que, ao excluir uma ocorrência, as confirmações vinculadas também sejam removidas, preservando a consistência referencial do banco.

---

## 9. Segurança e Políticas de Acesso

O código define políticas de Row Level Security (RLS) para as tabelas de ocorrências e confirmações. O esquema atual habilita leitura e inserção públicas em ambas as tabelas, conforme evidenciado nas políticas SQL.

As políticas incluem:

- leitura pública de ocorrências;
- inserção pública de ocorrências;
- leitura pública de confirmações;
- inserção pública de confirmações.

Essa abordagem é útil para prototipagem e demonstração, mas em um cenário de produção com dados sensíveis ou alto volume de uso, seria recomendável restringir o acesso por autenticação, além de aplicar regras de validação e moderação para reduzir abuso, duplicação e registros fraudulentos.

---

## 10. Lógica de Negócio e Cálculo de Status

A lógica de status do sistema está encapsulada em `src/lib/lifecycle.ts` e baseia-se em duas variáveis centrais:

- `expiryHours`: período máximo de validade sem nova confirmação;
- `normalizeThreshold`: limiar mínimo para considerar uma ocorrência como normalizada.

A função `computeStatus` analisa:

- número de confirmações do tipo `ativa`;
- número de confirmações do tipo `normalizada`;
- tempo decorrido desde a última atividade;
- janela temporal definida para expiração do relato.

Os estados possíveis são:

- `pendente`;
- `ativa`;
- `normalizada`;
- `expirada`.

A regra principal pode ser resumida como: uma ocorrência só é considerada ativa quando há uma confirmação de atividade relevante; se a ocorrência permanece sem atualização por um intervalo de tempo definido, ela é marcada como expirada. Caso haja predominância de confirmações de normalização, a ocorrência é classificada como normalizada.

---

## 11. Fluxo de Operação da Aplicação

### 11.1. Cadastro de ocorrência

O usuário pode registrar uma nova ocorrência informando os dados essenciais:

- título;
- descrição;
- tipo;
- gravidade;
- endereço;
- coordenadas geográficas;
- fotos opcionais.

Esse conjunto de informações permite a criação de um registro com contexto suficiente para análise e mapeamento geográfico.

### 11.2. Confirmação comunitária

Além do relato principal, o sistema permite que terceiros validem a ocorrência por meio de confirmações. Os tipos de confirmação disponíveis são:

- `ativa` – a ocorrência ainda representa um problema real e relevante;
- `normalizada` – a ocorrência foi resolvida ou não mais configura risco.

Essa interação social transforma o sistema em uma ferramenta colaborativa de monitoramento e verificação de eventos.

### 11.3. Consulta e visualização

A aplicação lê os dados do banco ou do armazenamento local e os apresenta em interface amigável. Esse processo inclui a composição de cards, estatísticas e indicadores de situação, apoiando a leitura e a análise dos dados pelos usuários.

---

## 12. Persistência de Dados e Estratégia de Desenvolvimento

O projeto foi concebido para operar em dois modos distintos:

1. modo com Supabase configurado;
2. modo de demonstração local.

No arquivo `src/services/occurrences.ts`, a aplicação verifica automaticamente a presença das variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Caso estas estejam configuradas, o sistema usa o Supabase como camada de persistência. Se não estiverem, o sistema recorre ao `localStorage` com dados demonstrativos.

Essa abordagem é particularmente útil para desenvolvimento iterativo, testes e apresentação de prova de conceito, sem necessidade de infraestrutura completa em todas as etapas.

---

## 13. Benefícios da Solução

A solução oferece diversos benefícios:

- centralização de relatos geolocalizados;
- suporte à participação colaborativa da comunidade;
- visualização clara de risco e gravidade;
- classificação dinâmica do estado da ocorrência;
- integração com infraestruturas modernas de persistência de dados;
- possibilidade de expansão para análises mais robustas, dashboards e automações.

---

## 14. Limitações e Pontos de Melhoria

Apesar da funcionalidade implementada, a solução ainda se encontra em estágio inicial e apresenta limitações naturais de um MVP:

- políticas públicas de acesso que exigem refinamento para produção;
- ausência de autenticação forte para controle de usuários;
- necessidade de regras de validação mais rígidas para mitigar registros duplicados ou falsos;
- possibilidade de ampliar a análise espacial com mapas mais sofisticados e filtros geográficos;
- necessidade de moderação de conteúdo e padronização de relatos para garantir qualidade dos dados.

---

## 15. Perspectivas de Evolução

O projeto pode ser expandido em diversas frentes, incluindo:

- autenticação e autorização por perfil de usuário;
- painel administrativo para moderação de ocorrências;
- notificação em tempo real;
- análise estatística por bairro, região e período;
- integração com APIs de clima e alertas meteorológicos;
- suporte a geolocalização mais precisa e mapas interativos avançados;
- histórico de status e evolução do evento ao longo do tempo.

Essas evoluções tornam o sistema mais robusto e mais adequado para uso em contextos reais de gestão urbana e prevenção de riscos.

---

## 16. Considerações Finais

O projeto apresentado constitui uma solução tecnológica de monitoramento colaborativo de ocorrências relacionadas a alagamentos e enchentes. Sua estrutura combina uso de banco de dados relacional, arquitetura modular em frontend, lógica de negócio aplicada à validação comunitária e persistência acessível em ambiente de desenvolvimento e produção.

A proposta demonstra aplicabilidade prática em cenários urbanos, especialmente em regiões afetadas por chuvas intensas e problemas recorrentes de infraestrutura. A combinação entre coleta de dados, georreferenciamento e validação colaborativa torna a solução relevante como ferramenta de apoio à gestão de riscos e à tomada de decisão comunitária.

---

## 17. Referências Internas do Projeto

- [supabase/schema.sql](supabase/schema.sql)
- [src/services/occurrences.ts](src/services/occurrences.ts)
- [src/lib/lifecycle.ts](src/lib/lifecycle.ts)
- [src/lib/supabase.ts](src/lib/supabase.ts)
- [src/types/occurrence.ts](src/types/occurrence.ts)
- [README.md](README.md)


---

## 10. Como o app decide entre Supabase e armazenamento local

No arquivo `src/services/occurrences.ts`, o projeto faz uma verificação inteligente:

- se o ambiente estiver configurado com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, usa Supabase;
- caso contrário, usa armazenamento local (`localStorage`) com dados de demonstração.

Isso é muito útil para o desenvolvimento, pois permite testar a aplicação mesmo sem backend real.

### Exemplo de comportamento

- Ambiente com Supabase configurado: dados reais são carregados do banco.
- Ambiente sem Supabase: é usada uma base demo em memória/armazenamento local.

Essa estratégia deixa o projeto flexível para prototipagem e evolução.

---

## 11. Fluxo técnico do sistema

Em termos de execução, o projeto funciona assim:

1. o usuário acessa a interface;
2. a tela carrega ocorrências via `useOccurrences()`;
3. o serviço consulta o banco ou o localStorage;
4. o app calcula status e exibe os registros;
5. o usuário pode registrar um relato ou confirmar um existente;
6. os dados são persistidos e a interface reage automaticamente.

Esse fluxo garante fácil manutenção e boa experiência para o usuário.

---

## 12. Pontos fortes do projeto

- arquitetura simples e didática;
- integração com Supabase pronta;
- suporte a dados locais em desenvolvimento;
- foco em mapear ocorrências reais de risco;
- uso de regras de negócio claras para status;
- componentes reutilizáveis e interface moderna.

---

## 13. Limitações atuais

Mesmo sendo um projeto funcional e bem estruturado, ele ainda tem algumas limitações naturais de MVP:

- políticas públicas de acesso no banco, que podem ser apertadas no futuro;
- autenticação mais simples do que um sistema de produção;
- necessidade de regras de validação mais robustas para evitar relatos falsos;
- possibilidade de expansão para painel administrativo, filtros avançados e geolocalização mais precisa.

---

## 14. Possíveis evoluções

Para um próximo nível, o projeto pode evoluir para:

- autenticação de usuários com perfil;
- painel administrativo para moderar ocorrências;
- notificação por email ou push;
- geolocalização com mapa melhor integrado;
- dashboard com estatísticas por bairro ou cidade;
- histórico de resolução de ocorrências;
- integração com API de clima e alertas meteorológicos.

---

## 15. Conclusão

Este projeto é uma aplicação de mapeamento comunitário focada na denúncia e acompanhamento de situações de alagamento e enchente. Ele usa uma estrutura moderna em React + TypeScript + Supabase e oferece uma base sólida para evolução.

A ideia central é transformar relatos locais em um sistema organizado de monitoramento urbano, ajudando a comunidade a visualizar e acompanhar riscos ambientais de forma visual e prática.

Se o objetivo for continuar o desenvolvimento, o próximo passo natural é reforçar:

- autenticação de usuários;
- políticas de segurança no Supabase;
- validação de dados;
- painel de administração;
- apuração de estatísticas e mapas regionais.

---

## 16. Referências internas do projeto

- [supabase/schema.sql](supabase/schema.sql)
- [src/services/occurrences.ts](src/services/occurrences.ts)
- [src/lib/lifecycle.ts](src/lib/lifecycle.ts)
- [src/lib/supabase.ts](src/lib/supabase.ts)
- [src/types/occurrence.ts](src/types/occurrence.ts)
- [README.md](README.md)
