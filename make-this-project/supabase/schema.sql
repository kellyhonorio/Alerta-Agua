create table if not exists occurrences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  titulo text not null,
  descricao text,
  tipo text not null,
  gravidade text not null,
  endereco text not null,
  latitude double precision not null,
  longitude double precision not null,
  autor text,
  photos text[] default '{}',
  is_demo boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists confirmations (
  id uuid primary key default gen_random_uuid(),
  occurrence_id uuid references occurrences(id) on delete cascade,
  kind text not null,
  created_at timestamptz default now()
);

alter table occurrences enable row level security;
alter table confirmations enable row level security;

create policy "Permitir leitura pública de ocorrências" on occurrences
for select using (true);

create policy "Permitir inserção de ocorrências" on occurrences
for insert with check (true);

create policy "Permitir leitura pública de confirmações" on confirmations
for select using (true);

create policy "Permitir inserção de confirmações" on confirmations
for insert with check (true);
