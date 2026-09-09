import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { MARK_VIEWBOX, PLATE_BACK, PLATE_FRONT } from './brand/FieldMark'

const STAGES = [
  'Iniciando sistema',
  'Carregando identidade visual',
  'Compilando conteúdo técnico',
  'Verificando integridade',
  'Pronto',
]

/**
 * Abertura da página: as duas placas do símbolo se aproximam até
 * formarem a marca, a régua de progresso corre e a cortina sobe.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(true)
  const startedAt = useRef(performance.now())

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reduced ? 700 : 2500

    let raf = 0
    const tick = () => {
      const elapsed = performance.now() - startedAt.current
      const t = Math.min(1, elapsed / total)
      // desacelera no fim, como um sistema que confere antes de liberar
      const eased = 1 - Math.pow(1 - t, 2.4)
      setProgress(eased)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setOpen(false), 260)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const pct = Math.round(progress * 100)
  const stage = STAGES[Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length))]

  // 0 → placas separadas · 1 → marca montada
  const assemble = Math.min(1, progress / 0.72)
  const gap = (1 - assemble) * 300
  // assinatura só aparece depois que as placas assentam
  const seated = Math.max(0, Math.min(1, (progress - 0.68) / 0.24))

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <div aria-hidden className="grid-field absolute inset-0 opacity-[0.35]" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 80% at 50% 45%, transparent 20%, rgba(5,8,12,0.92) 78%)',
            }}
          />

          {/* Cabeçalho técnico */}
          <div className="relative z-10 flex items-center justify-between px-[var(--shell)] pt-8">
            <span className="label-tech text-silver-400/60">Field Industrial</span>
            <span className="label-tech text-silver-400/60">Rev. 2027.01</span>
          </div>

          {/* Símbolo em montagem */}
          <motion.div
            className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8"
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: 'easeIn' }}
          >
            <svg
              viewBox={MARK_VIEWBOX}
              className="h-[34vh] max-h-[320px] min-h-[150px] w-auto"
              fill="none"
              aria-label="Field Industrial"
              role="img"
            >
              <defs>
                <linearGradient id="pl-back" x1="0" y1="0" x2="1" y2="0.85">
                  <stop offset="0" stopColor="#2C4A63" />
                  <stop offset="1" stopColor="#0C1E2C" />
                </linearGradient>
                <linearGradient id="pl-front" x1="0.05" y1="0" x2="0.95" y2="1">
                  <stop offset="0" stopColor="#E8EBEE" />
                  <stop offset="0.42" stopColor="#727A82" />
                  <stop offset="1" stopColor="#565D64" />
                </linearGradient>
              </defs>

              <g style={{ transform: `translateX(${-gap}px)`, opacity: 0.35 + assemble * 0.65 }}>
                <path d={PLATE_BACK} fill="url(#pl-back)" />
              </g>
              <g style={{ transform: `translateX(${gap}px)`, opacity: 0.35 + assemble * 0.65 }}>
                <path d={PLATE_FRONT} fillRule="evenodd" fill="url(#pl-front)" />
              </g>
            </svg>

            {/* Assinatura tipográfica — resolve quando as placas assentam */}
            <span
              className="flex flex-col items-center"
              style={{
                opacity: seated,
                transform: `translateY(${(1 - seated) * 12}px)`,
                transition: 'none',
              }}
            >
              <span
                className="display text-white"
                style={{
                  fontSize: 'clamp(1.35rem, 3vw, 2.1rem)',
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
                    fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                    fontVariationSettings: "'wdth' 112",
                    letterSpacing: '0.42em',
                    textIndent: '0.42em',
                  }}
                >
                  INDUSTRIAL
                </span>
                <span aria-hidden className="h-px w-5 bg-silver-400/50" />
              </span>
            </span>
          </motion.div>

          {/* Régua de progresso */}
          <div className="relative z-10 px-[var(--shell)] pb-10">
            <div className="mb-4 flex items-end justify-between gap-6">
              <motion.span
                key={stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="label-tech text-silver-400/80"
              >
                {stage}
              </motion.span>
              <span
                className="display text-white tabular-nums"
                style={{ fontSize: 'clamp(2rem,6vw,3.75rem)', fontVariationSettings: "'wdth' 118" }}
              >
                {String(pct).padStart(3, '0')}
                <span className="text-accent">%</span>
              </span>
            </div>

            <div className="relative h-px w-full bg-white/12">
              <div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${pct}%` }}
              />
              <div
                className="absolute -top-[3px] h-[7px] w-px bg-accent"
                style={{ left: `${pct}%` }}
              />
            </div>

            <div className="mt-4 flex justify-between">
              <span className="label-tech text-silver-400/40">
                Turning challenges <span className="text-accent/70">into</span> opportunity
              </span>
              <span className="label-tech text-silver-400/40">Lençóis Paulista · SP</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
