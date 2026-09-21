# VISUALIZER_REPORT — Noren Group

Protótipo navegável do site da Noren Group. Documento de entrega do visualizer.

---

## IMPLEMENTADO

- Seis rotas completas, export estático, sem backend.
- Design system em CSS: preto carvão (#111010 / #080808 / #0D0D0D), off-white
  (#EFECE6), dourado (#BA965B) e vermelho Noren (#9E2B18) usados com hierarquia
  rígida — o vermelho aparece só em CTA e no símbolo.
- Tipografia self-hosted: Instrument Serif (editorial, títulos) + Instrument Sans
  (UI, texto, microtipografia). Nenhuma fonte carregada de CDN em runtime.
- Navbar fixa: transparente no topo, superfície de vidro discreta ao rolar, some
  ao descer e volta ao subir. Item ativo com linha dourada.
- Cursor próprio (desktop): ponto dourado que cresce em elemento interativo e
  assume o vermelho sobre o CTA principal.
- Botões magnéticos (deslocamento máximo de 7px) com seta que desliza e
  preenchimento suave.
- Loading inicial de ~1,6s na primeira visita (NOREN + linha dourada), com
  sessão memorizada para não repetir.
- Acessibilidade de base: foco visível, aria-labels, contraste alto e respeito
  total a prefers-reduced-motion.

---

## PÁGINAS

| Rota | Conteúdo |
|---|---|
| / | herói, indicadores (Crescer não basta), visão sistêmica com diagrama, Noren System, manifesto rolado, CTA final |
| /metodo | herói, Noren System, storytelling READ/DECIDE/BUILD/COMPOUND com trilha de progresso, três frentes, princípios, CTA |
| /cases | herói, Casa Nami (case fictício), resultados com count-up, tabela antes/depois, grade de outros cases, CTA |
| /inteligencia | herói, Noren Signal simulado, insights, jornadas, CTA |
| /sobre | herói, crenças, significado de Noren, Ecossistema Noren, como pensamos, CTA |
| /contato | herói, formulário simulado, canais de resposta, faixa final |

---

## MOTION SYSTEM

- **Noren Portal** — transição entre rotas. Duas formas verticais entram pelas
  laterais, encontram-se no centro com uma linha dourada e o wordmark NOREN,
  a tela escurece, a rota troca, e as formas seguem para o lado oposto.
  ~470ms de cobertura + ~620ms de revelação. Só em navegação entre páginas.
- **Reveals por máscara** — títulos entram linha por linha (translate 112% -> 0)
  com stagger curto. Linhas declaradas à mão: nada de split automático.
- **Fade-up pesado** — parágrafos, listas e blocos entram a 88% da viewport, uma
  única vez, com deslocamento de 26px.
- **Parallax** — imagens de método, case e sobre deslocam ~±27px durante o scroll
  (dentro do orçamento de 20–60px do briefing). Desligado abaixo de 768px.
- **Manifesto** — seção sticky de 294vh; o progresso do scroll escolhe qual das
  três frases está viva, as outras se dissolvem com deslocamento leve.
- **Count-up** — números dos resultados sobem de zero quando entram na viewport.
- **Scroll suave** — Lenis com easing exponencial, sincronizado ao ScrollTrigger.

Regra aplicada: nada anima `top`, `left`, `width` ou `height`. Tudo é transform e
opacity. Com prefers-reduced-motion, parallax e órbitas param, as transições
encurtam e nenhum conteúdo fica escondido (verificado: zero elementos invisíveis).

---

## ECOSSISTEMA NOREN

Seção de /sobre. É o bloco com mais engenharia do projeto, e sem WebGL:
HTML + CSS transforms + requestAnimationFrame.

- Símbolo Noren no centro, sempre dominante, com aura radial discreta.
- Três órbitas elípticas quase invisíveis (14,2% / 27,4% / 40,2% do raio).
- Seis nós — Estratégia, Marca, Crescimento, Experiência, Inteligência e
  Retenção — cada um com órbita, velocidade, ângulo inicial e profundidade
  próprios. As velocidades têm sinais diferentes: o sistema nunca sincroniza.
- Respiração lenta: o raio de cada órbita varia 2,2% em frequências distintas.
- Influência de mouse com inércia (lerp de 0,045) e intensidade por camada:
  5px na órbita interna, 10px na média, 17px na externa. O movimento continua
  quando o mouse para.
- Hover em um nó: o nó ativo fica dourado e opaco, os outros caem para 35%, a
  órbita correspondente fica mais visível e o painel inferior mostra a leitura
  daquele nó.
- Rótulos posicionados para fora do raio, alternando de lado conforme o nó
  cruza o eixo vertical.

Um diagrama sistêmico mais simples (quatro nós, sem mouse) aparece na home, em
"Um restaurante é um sistema".

---

## SIGNAL

O que é simulado em /inteligencia:

1. Formulário com nome do restaurante e cidade (nenhum dado sai do navegador).
2. Varredura em quatro etapas — Mapeando presença local, Analisando reputação,
   Comparando posicionamento, Identificando oportunidades — com linha de
   progresso dourada, ~640ms por etapa.
3. Resultado mockado em seis indicadores (Presença local 72/100, Reputação
   68/100, Posicionamento Consistente, Descoberta +36%, Retenção 54/100, Margem
   potencial +22%), com count-up e a marcação "Exemplo de diagnóstico".
4. Botão para reiniciar a simulação.

Não há IA, não há consulta, não há rede. A tela diz isso explicitamente.
O formulário de /contato segue a mesma lógica: 760ms de loading e uma
confirmação — nada é enviado nem persistido.

---

## MOCK DATA

Tudo abaixo é fictício e está declarado em tela ou em comentário no código:

- Casa Nami, Bistrô Lume, Terra Brasa e Veluto (nomes, cozinhas, cidades).
- Os resultados +18% ticket médio, +27% reservas orgânicas, +41% busca da marca
  e −22% dependência de mídia.
- A tabela antes/depois (ticket médio, reservas em canais próprios, CAC).
- Todos os indicadores do Noren Signal.
- Os textos de resposta do formulário de contato.

Os arquivos data/cases.ts e data/signal.ts abrem com o aviso de ficção.

---

## LIMITAÇÕES

Propositalmente fora do escopo, conforme o briefing:

- Sem backend, banco, autenticação, CMS, API, CRM ou e-commerce.
- Formulários não enviam nada; não há captura de lead.
- Sem IA real, sem scraping, sem integração com Google, Instagram ou iFood.
- Sem SEO técnico, sitemap, OpenGraph ou analytics.
- Sem testes E2E, CI/CD ou pipeline de deploy.
- Sem área do cliente, painel administrativo ou multi-idioma.
- Sem WebGL, Three.js ou canvas: todo o movimento é DOM + transform.
- Omni não aparece em nenhum lugar, nem como placeholder.

Também vale registrar: as fotografias são placeholders de direção de arte
(Unsplash). Os textos são autorais deste visualizer.

---

## PRÓXIMOS PASSOS

Para transformar o visualizer em site de produção:

1. **Fotografia real.** Substituir as 20 imagens de public/images pelas fotos
   dos restaurantes, mantendo as proporções da tabela do README.
2. **Copy aprovada.** Revisar cada texto com o cliente; hoje o tom segue o
   briefing, mas não passou por aprovação.
3. **Cases reais.** Trocar o case fictício por um case autorizado, com números
   auditáveis e liberação de uso de imagem.
4. **Conversão de verdade.** Formulário com endpoint (e-mail transacional ou
   CRM), WhatsApp com link controlado e código do país, política de privacidade
   e consentimento LGPD.
5. **Signal.** Decidir entre remover a simulação ou implementar coleta real
   (Google Business Profile, avaliações, mapas), com tratamento de dado.
6. **SEO e compartilhamento.** Metadata por rota, OpenGraph, sitemap, robots,
   dados estruturados de negócio local.
7. **Qualidade.** Testes E2E de navegação e acessibilidade, Lighthouse, orçamento
   de performance, monitoramento de erro.
8. **Infra.** Domínio próprio, CDN, headers de segurança (CSP por hash) e
   pipeline de publicação.

---

## VERIFICAÇÃO DESTA ENTREGA

Build estático gerado e percorrido com navegador real (Chrome headless) em
1440x900 e 390x844:

- Todas as rotas respondem e renderizam com zero erro de console.
- Zero elemento de reveal preso em opacity 0 depois do scroll completo.
- Transição de rota verificada quadro a quadro (portal cobrindo e revelando).
- Navegação, menu mobile, Signal completo, formulário e hover do ecossistema
  exercitados por script.
- Com prefers-reduced-motion: nenhum conteúdo escondido, h1 visível, sem erro.
- Parallax medido: deslocamento real de ~15px entre dois pontos de scroll.
