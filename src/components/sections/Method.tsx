import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { method } from '../../data/content'
import { Fade, Headline, SectionRule } from '../ui/primitives'
import { useMediaQuery } from '../../lib/hooks'

function StepCard({ step, i }: { step: (typeof method.steps)[number]; i: number }) {
  return (
    <article className="group relative flex h-full w-full shrink-0 flex-col justify-between border border-white/12 bg-graphite-2/92 p-7 backdrop-blur-md transition-colors duration-500 hover:border-accent/50 lg:w-[24.5rem] lg:p-8">
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-accent transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
      />

      <div>
        <div className="flex items-baseline justify-between">
          <span
            className="display text-white/12 transition-colors duration-500 group-hover:text-accent/30"
            style={{ fontSize: '3.75rem', fontVariationSettings: "'wdth' 118", fontWeight: 700 }}
          >
            {step.n}
          </span>
          <span className="label-tech text-silver-400/40">
            {String(i + 1).padStart(2, '0')}/06
          </span>
        </div>

        <h3 className="display-tight mt-5 text-[1.5rem] text-white lg:text-[1.75rem]">
          {step.title}
        </h3>
      </div>

      <ul className="mt-8 flex flex-col gap-3.5 border-t border-white/10 pt-6">
        {step.items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-silver-400">
            <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent/70" />
            {it}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Method() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [step, setStep] = useState(0)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  useEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 96))
    }
    measure()
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 400)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [isDesktop])

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start start', 'end end'],
  })
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const x = useSpring(rawX, { stiffness: 260, damping: 42, mass: 0.6 })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.04, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setStep(Math.max(0, Math.min(method.steps.length - 1, Math.floor(v * method.steps.length))))
  })

  return (
    <section id="metodo" className="relative bg-ink">
      {/* fundo abstrato, bem recuado */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/media/mechanics-abstract.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-[0.16]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #05080C 0%, rgba(5,8,12,0.72) 30%, rgba(5,8,12,0.72) 70%, #05080C 100%)',
          }}
        />
      </div>

      {/* Cabeçalho — some no desktop, onde volta fixado junto ao trilho */}
      <div className="shell relative pt-24 sm:pt-32 lg:hidden">
        <SectionRule index={method.index} label={method.kicker} right="Estratégia → Execução" />
        <h2 className="text-white">
          <Headline lines={method.headline} size="clamp(2rem, 6vw, 2.75rem)" />
        </h2>
        <Fade delay={0.15}>
          <p className="mt-6 text-[15.5px] leading-relaxed text-silver-400">{method.lede}</p>
        </Fade>
      </div>

      {/* Trilho horizontal fixado */}
      <div
        ref={wrap}
        className="relative mt-14 lg:mt-0"
        style={{ height: isDesktop ? '300vh' : 'auto' }}
      >
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-[var(--header-h)]">
          {/* Cabeçalho que permanece durante a fixação */}
          <div className="shell hidden lg:block">
            <SectionRule index={method.index} label={method.kicker} right="Estratégia → Execução" />
            <div className="grid grid-cols-12 items-end gap-16 pb-10">
              <h2 className="col-span-7 text-white">
                <Headline lines={method.headline} size="clamp(1.9rem, 3.4vw, 3.15rem)" />
              </h2>
              <Fade delay={0.15} className="col-span-5">
                <p className="text-[14.5px] leading-relaxed text-silver-400">{method.lede}</p>
              </Fade>
            </div>
          </div>

          {/* linha guia */}
          <div className="shell mb-7 hidden lg:block">
            <div className="relative h-px w-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-accent"
                style={{ scaleX: lineScale }}
              />
            </div>
          </div>

          <motion.div
            ref={track}
            style={isDesktop ? { x } : undefined}
            className="flex gap-5 px-[var(--shell)] max-lg:flex-col lg:gap-6 lg:will-change-transform"
          >
            {method.steps.map((s, i) => (
              <StepCard key={s.n} step={s} i={i} />
            ))}
          </motion.div>

          {/* Indicador de avanço do trilho */}
          <div className="shell mt-9 hidden items-center gap-6 lg:flex">
            <span className="label-tech shrink-0 text-silver-400/50">Role para avançar</span>
            <div className="flex flex-1 gap-1.5">
              {method.steps.map((s, i) => (
                <span
                  key={s.n}
                  className={`h-px flex-1 transition-colors duration-500 ${
                    i <= step ? 'bg-accent' : 'bg-white/12'
                  }`}
                />
              ))}
            </div>
            <span className="label-tech shrink-0 text-white">
              {String(step + 1).padStart(2, '0')} <span className="text-silver-400/40">/ 06</span>
            </span>
          </div>
        </div>
      </div>

      {/* Compromisso */}
      <div className="shell relative pt-20 pb-24 sm:pb-32 lg:pb-40">
        <Fade>
          <p
            className="display-tight max-w-[52rem] text-white"
            style={{ fontSize: 'clamp(1.15rem, 2.1vw, 1.75rem)' }}
          >
            Nosso compromisso é simples:{' '}
            <span className="text-accent">planejar com inteligência, executar com excelência.</span>
          </p>
        </Fade>

        <div className="mt-12 grid gap-px border-t border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {method.commitments.map((c, i) => (
            <Fade key={c.title} delay={i * 0.07}>
              <div className="group h-full bg-ink px-6 pt-7 pb-8 transition-colors duration-500 hover:bg-graphite-2">
                <span
                  aria-hidden
                  className="mb-5 block h-px w-8 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-16"
                />
                <h3 className="display-tight text-[1.05rem] text-white">{c.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-silver-400">{c.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}
