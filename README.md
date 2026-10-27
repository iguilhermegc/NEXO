# nexo.menu

Landing page do **nexo.menu**, o cardápio digital do grupo Nexo para restaurantes de Petrolina-PE.

O cliente encosta o celular na tag da mesa (NFC ou QR Code), vê o cardápio com vídeos dos pratos, chama o garçom e pede a conta. O restaurante acompanha os chamados num painel do salão. A Nexo monta e atualiza tudo.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) com React 19 e TypeScript
- CSS puro em `app/globals.css` (sem framework de estilo)
- Fontes Instrument Serif e Geist via `next/font`
- [Lenis](https://lenis.darkroom.engineering) para scroll suave e [ScrollReveal](https://scrollrevealjs.org) para animações de entrada
- [Resend](https://resend.com) para enviar o formulário de contato por e-mail

## Começando

Requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
cp .env.example .env.local   # e preencha as variáveis
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |

## Variáveis de ambiente

Definidas em `.env.local` (veja `.env.example`). Só o formulário de contato depende delas; sem elas, a página funciona e o envio retorna erro.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `RESEND_API_KEY` | Sim | Chave da API do Resend |
| `CONTACT_TO_EMAIL` | Sim | E-mail da Nexo que recebe os contatos |
| `CONTACT_FROM_EMAIL` | Não | Remetente. Padrão: `nexo.menu <onboarding@resend.dev>`, que só entrega para o dono da conta Resend enquanto não houver domínio verificado |

## Estrutura

```
app/
  layout.tsx           Fontes, metadados e scroll suave
  page.tsx             Seções da landing (hero, como funciona, painel, o que inclui, piloto, FAQ, contato)
  globals.css          Todo o sistema visual
  api/contato/route.ts POST do formulário: valida, filtra robôs (honeypot) e envia via Resend
components/
  HeroScrub.tsx        Hero com a logo montada pelo scroll e mockups em CSS
  Steps.tsx            "Como funciona" em 3 passos
  Panel.tsx            Mockup do painel do salão
  FaqSection.tsx       Acordeão de dúvidas
  ContactForm.tsx      Formulário de contato
  ScrollChrome.tsx     Header
  Footer.tsx, Logo.tsx, icons.tsx
  SmoothScroll.tsx     Lenis
  Reveal.tsx           ScrollReveal
public/
  nexo-logo.png
```

## Design

O sistema visual (cores, tipografia, componentes, layout) está documentado em [DESIGN.md](DESIGN.md). A fonte da verdade é `app/globals.css`: se os dois divergirem, o CSS vale e o DESIGN.md deve ser atualizado.
