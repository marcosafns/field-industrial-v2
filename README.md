# Field Industrial — site institucional (v2)

Reconstrução completa da presença digital da Field Industrial: página única,
foco em performance e em fidelidade à identidade visual 2027 (rev. 01).

## Stack

| Camada    | Escolha                                    |
| --------- | ------------------------------------------ |
| Build     | Vite 8 + TypeScript                        |
| UI        | React 19                                   |
| Estilo    | Tailwind CSS v4 (tokens em `@theme`)       |
| Animação  | `motion` (Framer Motion)                   |
| Rolagem   | `lenis`                                    |

Sem biblioteca de componentes: toda a interface é própria, para que o site não
carregue a aparência genérica de um template.

## Rodando

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera dist/
npm run preview  # serve o build de produção
```

## Estrutura

```
src/
├─ data/content.ts        # todo o conteúdo editorial em um único lugar
├─ styles/index.css       # tokens de marca, utilitários e base
├─ lib/hooks.ts           # rolagem suave, viewport, contadores, seção ativa
├─ components/
│  ├─ brand/FieldMark.tsx # símbolo vetorizado + lockup do logotipo
│  ├─ Preloader.tsx       # abertura: as placas do símbolo se montam
│  ├─ Header.tsx · Footer.tsx
│  └─ sections/           # um arquivo por capítulo da página
└─ App.tsx
public/media/             # fotografia e logotipos de clientes
```

### Onde editar o quê

- **Texto, números, contatos, lista de clientes** → `src/data/content.ts`.
  Nenhuma cópia está embutida nos componentes.
- **Cores, tipografia, medidas** → bloco `@theme` em `src/styles/index.css`.
- **Símbolo da marca** → `src/components/brand/FieldMark.tsx`. O símbolo é
  vetor puro (duas placas + rasgo do "F"), então escala sem perda, adapta-se a
  fundo claro ou escuro e é o mesmo desenho usado no favicon e na animação de
  abertura.

## Sistema de design

**Cores** — grafite `#05080C`, naval `#04101F`, aço `#46586B`, prata `#C9CED5`,
papel `#F4F5F7` e o laranja industrial `#EF5A18`, usado com parcimônia: réguas,
índices e uma palavra por título.

**Tipografia** — `Archivo` (eixo de largura variável) nos títulos, ecoando o
lettering expandido do logotipo; `IBM Plex Sans` no texto corrido;
`IBM Plex Mono` nos micro-rótulos técnicos.

**Divisórias** — cada capítulo abre com uma régua indexada (`01 — QUEM SOMOS`),
no espírito de um carimbo de prancha de engenharia, e a página alterna entre
fundo escuro e papel para marcar a virada de assunto.

**Cantos chanfrados** (`bevel-sm`, `bevel-tr`) citam o corte das placas do
símbolo — é o detalhe que amarra cartões, botões e imagens à marca.

## Decisões que valem registro

- **Animação sob máscara**: o gatilho de viewport fica sempre no elemento que
  recorta, nunca no conteúdo deslocado — um filho empurrado para fora do
  recorte tem área de interseção zero e o `IntersectionObserver` nunca
  dispararia.
- **Acentuação**: máscaras de revelação recebem folga vertical (`py`/`-my`)
  para não cortar o topo de maiúsculas acentuadas (Ã, Ç, É).
- **`prefers-reduced-motion`** é respeitado: paralaxe, contadores e a abertura
  degradam para estados finais imediatos.
- **Imagens** foram recomprimidas e curadas; o conjunto inteiro pesa ~2,3 MB.
  O herói é pré-carregado com `fetchpriority="high"`.

## Conteúdo

Textos originados do site atual (fieldindustrial.com.br) e da Apresentação
Institucional Field Industrial 2027 rev. 01.
