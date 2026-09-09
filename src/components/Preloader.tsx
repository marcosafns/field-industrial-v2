import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MARK_VIEWBOX } from './brand/FieldMark'

/* ------------------------------------------------------------------
   Abertura — a marca é construída, não apenas exibida.

   canteiro → traçado → montagem → acabamento → assinatura

   Toda a coreografia deriva de um único progresso 0→1, então nada
   dessincroniza se a duração mudar.
   ------------------------------------------------------------------ */

const DURATION = 2600
/** Pausa na marca montada antes da cortina subir. */
const HOLD = 560

/** Contornos separados para que cada etapa do traçado tenha seu tempo. */
const OUTLINE_BACK = 'M0 228 L390 0 L408 383 L310 458 L275 1248 L10 1088 Z'
const OUTLINE_FRONT = 'M332 510 L698 296 L695 1128 L338 1348 Z'
const OUTLINE_SLOT = 'M310 672 L492 566 L502 652 L320 758 Z'
const FILL_FRONT = `${OUTLINE_FRONT} ${OUTLINE_SLOT}`

const LEN_BACK = 3000
const LEN_FRONT = 2600
const LEN_SLOT = 640

const STAGES: { at: number; label: string }[] = [
  { at: 0.0, label: 'Preparando canteiro' },
  { at: 0.18, label: 'Traçando estrutura' },
  { at: 0.48, label: 'Montando placas' },
  { at: 0.74, label: 'Aplicando acabamento' },
  { at: 0.93, label: 'Pronto' },
]

/** Mapeia p de [a,b] para [0,1] com suavização. */
function phase(p: number, a: number, b: number, ease = true) {
  const t = Math.max(0, Math.min(1, (p - a) / (b - a)))
  return ease ? 1 - Math.pow(1 - t, 3) : t
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0)
  const [open, setOpen] = useState(true)
  const closing = useRef(false)

  const finish = useCallback(() => {
    if (closing.current) return
    closing.current = true
    setP(1)
    setTimeout(() => setOpen(false), HOLD)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setP(1)
      const t = setTimeout(() => setOpen(false), 320)
      return () => clearTimeout(t)
    }

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      if (closing.current) return
      const t = Math.min(1, (now - start) / DURATION)
      setP(t)
      if (t < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [finish])

  // --- etapas ---
  const site = phase(p, 0.0, 0.2) // canteiro: grade e marcas de registro
  const drawBack = phase(p, 0.18, 0.36, false)
  const drawFront = phase(p, 0.3, 0.46, false)
  const drawSlot = phase(p, 0.44, 0.52, false)
  const assemble = phase(p, 0.48, 0.76) // placas se aproximam
  const material = phase(p, 0.74, 0.92) // preenchimento materializa
  const sign = phase(p, 0.83, 0.97) // assinatura tipográfica

  const gap = (1 - assemble) * 260
  const pct = Math.round(p * 100)
  const stage = [...STAGES].reverse().find((s) => p >= s.at)?.label ?? STAGES[0].label

  // varredura que passa uma vez quando o material aparece
  const scan = phase(p, 0.76, 0.9, false)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <div key="preloader" className="fixed inset-0 z-[100]">
          {/* lâmina de acento — aparece por um instante atrás da cortina */}
          <motion.div
            className="absolute inset-0 bg-accent"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          <motion.div
            className="absolute inset-0 flex flex-col bg-ink"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            onClick={finish}
            role="status"
            aria-live="polite"
            aria-label={`Carregando ${pct}%`}
          >
            {/* canteiro: grade técnica */}
            <div
              aria-hidden
              className="grid-field absolute inset-0"
              style={{ opacity: site * 0.6 }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(115% 75% at 50% 46%, transparent 18%, rgba(5,8,12,0.94) 76%)',
              }}
            />

            {/* cabeçalho técnico */}
            <div
              className="relative z-10 flex items-center justify-between px-[var(--shell)] pt-7"
              style={{ opacity: site }}
            >
              <span className="label-tech text-silver-400/55">Field Industrial</span>
              <span className="label-tech text-silver-400/55">Rev. 2027.01</span>
            </div>

            {/* --- prancha --- */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6">
              <motion.div
                className="relative"
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: 'easeIn' }}
              >
                <div className="relative h-[40vh] max-h-[370px] min-h-[168px]">
                  {/* cotas — linguagem de prancha de engenharia */}
                  <span
                    aria-hidden
                    className="absolute top-0 -left-9 h-full w-px bg-silver-400/40 sm:-left-14"
                    style={{ opacity: site * 0.9, transform: `scaleY(${site})`, transformOrigin: 'top' }}
                  >
                    <span className="absolute -top-px -left-[3px] h-px w-[7px] bg-silver-400/45" />
                    <span className="absolute -bottom-px -left-[3px] h-px w-[7px] bg-silver-400/45" />
                  </span>
                  <span
                    aria-hidden
                    className="absolute -bottom-9 left-0 h-px w-full bg-silver-400/40 sm:-bottom-12"
                    style={{ opacity: site * 0.9, transform: `scaleX(${site})`, transformOrigin: 'left' }}
                  >
                    <span className="absolute -top-[3px] -left-px h-[7px] w-px bg-silver-400/45" />
                    <span className="absolute -top-[3px] -right-px h-[7px] w-px bg-silver-400/45" />
                  </span>

                  <svg
                    viewBox={MARK_VIEWBOX}
                    className="h-full w-auto overflow-visible"
                    fill="none"
                    role="img"
                    aria-label="Field Industrial"
                  >
                    <defs>
                      <linearGradient id="pl-back" x1="0" y1="0" x2="1" y2="0.85">
                        <stop offset="0" stopColor="#2C4A63" />
                        <stop offset="0.45" stopColor="#1B3448" />
                        <stop offset="1" stopColor="#0C1E2C" />
                      </linearGradient>
                      <linearGradient id="pl-front" x1="0.05" y1="0" x2="0.95" y2="1">
                        <stop offset="0" stopColor="#E8EBEE" />
                        <stop offset="0.2" stopColor="#9AA3AC" />
                        <stop offset="0.5" stopColor="#6E767E" />
                        <stop offset="0.75" stopColor="#8D959D" />
                        <stop offset="1" stopColor="#565D64" />
                      </linearGradient>

                      {/* luz de acabamento: faixa suave, não um bloco */}
                      <linearGradient id="pl-sweep" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#FFB98C" stopOpacity="0" />
                        <stop offset="0.5" stopColor="#FFD3B4" stopOpacity="0.85" />
                        <stop offset="1" stopColor="#FFB98C" stopOpacity="0" />
                      </linearGradient>

                      <clipPath id="clip-back">
                        <path d={OUTLINE_BACK} />
                      </clipPath>
                      <clipPath id="clip-front">
                        <path d={FILL_FRONT} clipRule="evenodd" />
                      </clipPath>
                    </defs>

                    {/* placa naval */}
                    <g style={{ transform: `translateX(${-gap}px)` }}>
                      <path
                        d={OUTLINE_BACK}
                        stroke="#93A2B2"
                        strokeWidth="9"
                        strokeLinejoin="round"
                        strokeDasharray={LEN_BACK}
                        strokeDashoffset={LEN_BACK * (1 - drawBack)}
                        opacity={1 - material}
                      />
                      <path d={OUTLINE_BACK} fill="url(#pl-back)" opacity={material} />
                      {scan > 0 && scan < 1 && (
                        <g clipPath="url(#clip-back)">
                          <rect
                            x="-80"
                            y={-260 + scan * 1820}
                            width="880"
                            height="260"
                            fill="url(#pl-sweep)"
                            opacity="0.5"
                          />
                        </g>
                      )}
                    </g>

                    {/* placa em aço + rasgo do "F" */}
                    <g style={{ transform: `translateX(${gap}px)` }}>
                      <path
                        d={OUTLINE_FRONT}
                        stroke="#C6CED7"
                        strokeWidth="9"
                        strokeLinejoin="round"
                        strokeDasharray={LEN_FRONT}
                        strokeDashoffset={LEN_FRONT * (1 - drawFront)}
                        opacity={1 - material}
                      />
                      <path
                        d={OUTLINE_SLOT}
                        stroke="#EF5A18"
                        strokeWidth="9"
                        strokeLinejoin="round"
                        strokeDasharray={LEN_SLOT}
                        strokeDashoffset={LEN_SLOT * (1 - drawSlot)}
                        opacity={1 - material}
                      />
                      <path d={FILL_FRONT} fillRule="evenodd" fill="url(#pl-front)" opacity={material} />
                      {scan > 0 && scan < 1 && (
                        <g clipPath="url(#clip-front)">
                          <rect
                            x="-80"
                            y={-260 + scan * 1820}
                            width="880"
                            height="260"
                            fill="url(#pl-sweep)"
                            opacity="0.75"
                          />
                        </g>
                      )}
                    </g>
                  </svg>
                </div>

                {/* assinatura tipográfica */}
                <div
                  className="mt-9 flex flex-col items-center"
                  style={{ opacity: sign, transform: `translateY(${(1 - sign) * 10}px)` }}
                >
                  <span
                    className="display text-white"
                    style={{
                      fontSize: 'clamp(1.3rem, 2.8vw, 1.95rem)',
                      fontVariationSettings: "'wdth' 125",
                      fontWeight: 400,
                      letterSpacing: '0.34em',
                      textIndent: '0.34em',
                    }}
                  >
                    FIELD
                  </span>
                  <span className="mt-2.5 flex items-center gap-3">
                    <span aria-hidden className="h-px w-5 bg-silver-400/50" />
                    <span
                      className="display text-silver-300"
                      style={{
                        fontSize: 'clamp(0.58rem, 0.95vw, 0.72rem)',
                        fontVariationSettings: "'wdth' 112",
                        letterSpacing: '0.42em',
                        textIndent: '0.42em',
                      }}
                    >
                      INDUSTRIAL
                    </span>
                    <span aria-hidden className="h-px w-5 bg-silver-400/50" />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* --- rodapé: etapa e avanço --- */}
            <div className="relative z-10 px-[var(--shell)] pb-9" style={{ opacity: site }}>
              <div className="mb-4 flex items-end justify-between gap-6">
                <span className="flex flex-col gap-2">
                  <span className="label-tech text-silver-400/40">Etapa</span>
                  <motion.span
                    key={stage}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="label-tech text-silver-200"
                  >
                    {stage}
                  </motion.span>
                </span>

                <span
                  className="display text-white tabular-nums"
                  style={{
                    fontSize: 'clamp(1.9rem,5.5vw,3.4rem)',
                    fontVariationSettings: "'wdth' 118",
                    lineHeight: 1,
                  }}
                >
                  {String(pct).padStart(3, '0')}
                  <span className="text-accent">%</span>
                </span>
              </div>

              {/* régua com as marcas de cada etapa */}
              <div className="relative h-px w-full bg-white/12">
                <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${pct}%` }} />
                <div className="absolute -top-[3px] h-[7px] w-px bg-accent" style={{ left: `${pct}%` }} />
                {STAGES.slice(1).map((s) => (
                  <span
                    key={s.label}
                    aria-hidden
                    className="absolute -top-[2px] h-[5px] w-px transition-colors duration-300"
                    style={{
                      left: `${s.at * 100}%`,
                      background: p >= s.at ? 'rgba(239,90,24,0.9)' : 'rgba(255,255,255,0.22)',
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="label-tech text-silver-400/35">
                  Turning challenges <span className="text-accent/70">into</span> opportunity
                </span>
                <span className="label-tech hidden text-silver-400/35 sm:block">
                  Lençóis Paulista · SP
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
