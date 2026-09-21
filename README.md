# NOREN GROUP — Visualizer

Protótipo navegável do site da Noren Group. Não é o site de produção: é um
concept car digital, feito para apresentar experiência, identidade e direção
estética da marca. Sem backend, sem banco, sem autenticação.

Next.js (App Router) + TypeScript + Tailwind v4 + GSAP + Lenis, com export
estático: o resultado é um conjunto de arquivos que roda em qualquer CDN.

---

## Rodar

    npm install
    npm run dev          # http://localhost:3000

## Build

    npm run build        # gera ./out (estático)
    npm start            # serve ./out localmente

Publicando em um subdiretório (GitHub Pages, por exemplo):

    NEXT_PUBLIC_BASE_PATH=/nome-do-repo npm run build

---

## Estrutura

    app/                     rotas (App Router, export estático)
      layout.tsx             fontes, navbar, footer, cursor, transições
      globals.css            design system: cores, tipografia, grid, movimento
      page.tsx               home
      metodo/ cases/ inteligencia/ sobre/ contato/
    components/
      brand/                 logotipo, símbolo Noren, ícones de linha fina
      motion/                Reveal, RevealLines, ParallaxImage, CountUp
      sections/              Hero, Manifesto, NorenEcosystem, SignalDemo,
                             ContactForm, Storytelling, CaseHighlight, ...
      transition/            Noren Portal (transição entre rotas)
      ui/                    Button, SectionLabel, ScrollCue
      Navbar.tsx  Footer.tsx  SmoothScroll.tsx  CustomCursor.tsx  Preloader.tsx
    data/                    conteúdo mockado (cases, ecossistema, signal, menu)
    lib/                     gsap, lenis, helpers
    assets/fonts/            tipografia self-hosted (woff2)
    public/images/           fotografia

---

## Bibliotecas

| Biblioteca | Por quê |
|---|---|
| next + react | App Router com export estático |
| tailwindcss v4 | utilitários de layout sobre um design system escrito em CSS |
| gsap + ScrollTrigger | reveals, parallax, count-up, manifesto, transições |
| lenis | scroll inercial sincronizado com o ScrollTrigger |
| playwright-core (dev) | verificação visual das rotas |

Cinco dependências de produção. Sem biblioteca de componentes, sem pacote de
ícones: os ícones são SVG desenhados à mão com traço 1.1.

---

## Trocar imagens

Todas as fotografias ficam em public/images/ e são referenciadas por caminho
em data/*.ts ou direto no JSX. Para substituir, mantenha o nome do arquivo e
uma proporção próxima:

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| hero-home, hero-metodo, hero-cases, hero-inteligencia, hero-sobre, hero-contato | heróis de página, full-bleed | 3:2, mínimo 2200px de largura |
| banda-jantar, banda-prato, banda-prato-escuro, banda-jardim | faixas de CTA | 16:9, mínimo 2000px |
| metodo-read, metodo-decide, metodo-build, metodo-compound | storytelling do método | 5:4 |
| case-nami, case-lume, case-terra, case-veluto | cases | 4:5 no destaque, 4:3 na grade |
| noren-cortina | seção significado de Noren | 4:3 |
| mesa-madeira | reserva | 3:2 |

As imagens atuais vêm do Unsplash e servem só como placeholder de direção de
arte. Substitua pelas fotografias reais antes de qualquer uso público.

---

## Editar copy

Nada de texto escondido em componente. Os conteúdos repetíveis vivem em data/:

- data/navigation.ts — menu, rótulo do CTA, links do footer
- data/cases.ts — case em destaque, resultados, outros cases
- data/ecosystem.ts — nós do Ecossistema Noren (nome, sub, descrição, órbita)
- data/signal.ts — etapas da varredura, métricas, insights, jornadas

Títulos e parágrafos de cada seção estão no arquivo da página ou no componente
de seção correspondente, sempre como texto literal.

---

## Aviso

Cases, restaurantes, cidades, percentuais e o diagnóstico do Noren Signal são
**fictícios**, criados para este visualizer. O formulário de contato não envia
nada e o Signal não consulta nenhuma fonte externa: são simulações visuais,
declaradas em tela.
