import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { company, hero } from '../../data/content'

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130])
  const contentFade = useTransform(scrollYProgress, [0, 0.72], [1, 0])

  const enter = (delay: number) => ({
    initial: { y: '110%' },
    animate: { y: ready ? '0%' : '110%' },
    transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] as const, delay },
  })

  return (
    <section
      id="topo"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Fundo */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -z-20">
        <img
          src="/media/hero.jpg"
          alt="Estrutura metálica industrial ao entardecer, com iluminação de trabalho"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,8,12,0.86) 0%, rgba(5,8,12,0.34) 32%, rgba(5,8,12,0.68) 66%, #05080C 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(4,16,31,0.82) 0%, rgba(4,16,31,0.24) 46%, transparent 72%)',
        }}
      />
      <div aria-hidden className="grid-field absolute inset-0 -z-10 opacity-[0.18]" />

      {/* Conteúdo */}
      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="shell relative pt-[calc(var(--header-h-top)+2rem)] pb-14 sm:pb-20"
      >
        <div className="max-w-[62rem]">
          <span className="block overflow-hidden">
            <motion.span
              {...enter(0.15)}
              className="label-tech flex items-center gap-3 text-silver-300/80"
            >
              <span aria-hidden className="h-px w-8 bg-accent" />
              {hero.eyebrow}
            </motion.span>
          </span>

          <h1 className="mt-7 sm:mt-9">
            {hero.headline.map((line, i) => (
              <span key={line} className="block overflow-hidden py-[0.06em] -my-[0.06em]">
                <motion.span
                  {...enter(0.3 + i * 0.1)}
                  className="display block text-white"
                  style={{ fontSize: 'clamp(2.35rem, 7.4vw, 6.75rem)' }}
                >
                  {line.split(/\*(.+?)\*/g).map((chunk, j) =>
                    j % 2 === 1 ? (
                      <span key={j} className="text-accent">
                        {chunk}
                      </span>
                    ) : (
                      <span key={j}>{chunk}</span>
                    ),
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-10 grid gap-10 border-t border-white/12 pt-8 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="lede max-w-[46rem] text-silver-300"
          >
            {hero.body}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="flex flex-wrap gap-x-10 gap-y-5 lg:flex-nowrap"
          >
            {hero.meta.map((m) => (
              <div key={m.k} className="border-l border-white/15 pl-4">
                <dt className="label-tech text-silver-400/60">{m.k}</dt>
                <dd className="mt-1.5 text-[13px] whitespace-nowrap text-silver-200">{m.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Rodapé do herói */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-12 flex items-center justify-between gap-6 sm:mt-16"
        >
          <a
            href="#empresa"
            className="group flex items-center gap-4"
            aria-label="Rolar para a próxima seção"
          >
            <span className="relative grid h-11 w-11 place-items-center overflow-hidden border border-white/20">
              <span
                aria-hidden
                className="absolute inset-0 origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <svg viewBox="0 0 10 16" className="relative z-10 h-4 w-2.5" fill="none" aria-hidden>
                <path d="M5 0v14M1 10l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </span>
            <span className="label-tech text-silver-400/70 transition-colors group-hover:text-white">
              Conheça a Field
            </span>
          </a>

          <span className="label-tech hidden text-right text-silver-400/50 sm:block">
            {company.tagline.split(' into ')[0]}{' '}
            <span className="text-accent">into</span>{' '}
            {company.tagline.split(' into ')[1]}
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
