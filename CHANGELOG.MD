## [1.0.1] - 2026-04-16 - 2026-04-17
### Adicionado
- Galeria de fotos com categorias
- Implementação completa de SEO (OpenGraph, Twitter Cards, Canonical Tags).
- Geração automática de `sitemap.xml` e `robots.txt`.
- Schema.org (JSON-LD) para LocalBusiness (SEO Local).
- Rate Limiting e validação de campos na API de contato.
- Headers de segurança (CSP, HSTS, X-Frame-Options).
- Arquivo `.env.example` para ajuda na configuração de ambiente.

### Alterado
- Lógica de backend migrada de Express para Next.js API Routes (`/api/contact`).
- `ContactForm` atualizado para utilizar a API interna.
- Configuração do Next.js reforçada com políticas de segurança e cache.
- Arquitetura simplificada para deploy 100% gratuito no Netlify.

### Removido
- Pasta `backend/` (servidor Express standalone removido).
---

## [1.0.0] - 2026-03-31
### Adicionado
- frontend com nextjs criado 

### Alterado
- 

### Removido
- 
---