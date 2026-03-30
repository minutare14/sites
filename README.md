# Momo & Cia: Storefront + Saleor

Esta base foi migrada de Medusa para Saleor mantendo o storefront atual e consolidando a operacao local em um unico `docker-compose.yml`.

## Stack local

- `gateway`: reverse proxy unico da stack local em `http://localhost:8100`
- `saleor-api`: GraphQL do Saleor em `http://localhost:8100/graphql/`
- `saleor-dashboard`: admin do Saleor em `http://localhost:8100/app/`
- `storefront`: vitrine atual em `http://localhost:3300`
- `saleor-db`: Postgres
- `saleor-cache`: Valkey/Redis
- `saleor-worker`: background worker do Saleor
- `mailpit`: inbox SMTP local em `http://localhost:8025`

## URL esperada do admin no dominio antigo

Para manter a mesma logica do backend usado antes com o Medusa, o admin do Saleor deve continuar sob o dominio base da API:

- API: `https://api.momo.minutarecore.space/graphql/`
- Admin: `https://api.momo.minutarecore.space/app/`

No ambiente local, essa mesma estrutura fica:

- API: `http://localhost:8100/graphql/`
- Admin: `http://localhost:8100/app/`

## Subir tudo

```bash
docker compose up -d --build
```

## Preparar banco

```bash
docker compose run --rm saleor-api python manage.py migrate
```

## Criar admin

```bash
docker compose run --rm -e DJANGO_SUPERUSER_PASSWORD=asd14200 saleor-api python manage.py createsuperuser --email emanoelmcedo@gmail.com --noinput
```

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
