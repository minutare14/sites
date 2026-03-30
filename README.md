# Momo & Cia: Storefront + Saleor

Esta base foi migrada de Medusa para Saleor mantendo o storefront atual e consolidando a operacao local em um unico `docker-compose.yml`.
O compose foi ajustado para manter um servico publico chamado `backend`, preservando a compatibilidade com o mapeamento de dominio que o Dokploy ja esperava do projeto anterior.

## Stack local

- `backend`: reverse proxy unico da stack local em `http://localhost:8100`
- `saleor-api`: GraphQL do Saleor em `http://localhost:8100/graphql/`
- `saleor-dashboard`: admin do Saleor em `http://localhost:8100/app/`
- `storefront`: vitrine atual em `http://localhost:3300`
- `saleor-db`: Postgres
- `saleor-cache`: Valkey/Redis
- `saleor-worker`: background worker do Saleor
- `mailpit`: inbox SMTP local em `http://localhost:8025`

## Regra de dominio

- `momo.minutarecore.space` -> servico `storefront`
- `api.momo.minutarecore.space` -> servico `backend`
- `https://api.momo.minutarecore.space/graphql/` -> Saleor API via `backend`
- `https://api.momo.minutarecore.space/app/` -> Saleor Dashboard via `backend`

## URL esperada do admin no dominio antigo

Para manter a mesma logica do backend usado antes com o Medusa, o admin do Saleor deve continuar sob o dominio base da API:

- API: `https://api.momo.minutarecore.space/graphql/`
- Admin: `https://api.momo.minutarecore.space/app/`

No ambiente local, essa mesma estrutura fica:

- API: `http://localhost:8100/graphql/`
- Admin: `http://localhost:8100/app/`

## Subir tudo

```bash
docker compose up -d --build --remove-orphans
```

Antes do primeiro boot, copie [`.env.example`](C:\Users\emano\OneDrive\Documentos\Downloads\site_evelyn\.env.example) para `.env` e ajuste:

- credenciais do Postgres (`SALEOR_DB_USER`, `SALEOR_DB_PASSWORD`, `SALEOR_DB_NAME`)
- `DATABASE_URL`, caso voce prefira sobrescrever a conexao completa em vez de usar os valores acima
- URLs publicas
- `SECRET_KEY`
- admin do Saleor (`DJANGO_SUPERUSER_EMAIL`, `DJANGO_SUPERUSER_PASSWORD`)

## Preparar banco

```bash
docker compose run --rm saleor-api python manage.py migrate
```

## Criar admin

```bash
docker compose up -d
```

O compose agora executa o bootstrap do admin automaticamente no servico `saleor-migrate`, usando `DJANGO_SUPERUSER_EMAIL`, `DJANGO_SUPERUSER_PASSWORD`, `DJANGO_SUPERUSER_FIRST_NAME` e `DJANGO_SUPERUSER_LAST_NAME` definidos no `.env`.

Se voce trocar a senha no `.env` e subir a stack de novo, o bootstrap atualiza a senha do mesmo email.

## Migrar catalogo do snapshot Medusa para o Saleor

```bash
node scripts/migrate-medusa-to-saleor.mjs
```

O script:

- le `data/medusa-products.export.json`
- cria ou reaproveita canal, atributos, categorias e colecoes
- recria os produtos no Saleor sem duplicar por `externalReference`/`slug`
- publica no canal `momo-br`
- preserva imagens por upload a partir das URLs existentes

## Extraindo novamente de uma API Medusa

```bash
MEDUSA_URL=http://seu-medusa:9000 node scripts/export-medusa-products.mjs
```

Depois disso:

```bash
node scripts/migrate-medusa-to-saleor.mjs
```

## Observacao do dashboard

O catalogo migrado fica publicado no canal `momo-br` (`Momo Brasil`). No primeiro acesso ao dashboard, se o topo estiver em `Default Channel`, troque para `Momo Brasil` para inspecionar a operacao em BRL.

## Variaveis uteis para Dokploy

Se voce quiser deixar o mesmo compose pronto para producao sem renomear servicos no painel, use estas variaveis:

- `BACKEND_PUBLIC_URL=https://api.momo.minutarecore.space/`
- `SALEOR_GRAPHQL_PUBLIC_URL=https://api.momo.minutarecore.space/graphql/`
- `SALEOR_DASHBOARD_PUBLIC_URL=https://api.momo.minutarecore.space/app/`
- `SALEOR_ALLOWED_HOSTS=localhost,127.0.0.1,backend,saleor-api,api.momo.minutarecore.space`
