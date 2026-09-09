import { motion } from 'motion/react'
import { metrics } from '../../data/content'
import { useCounter, useInView } from '../../lib/hooks'

function Metric({
  value,
  suffix,
  label,
  note,
  index,
  run,
}: (typeof metrics)[number] & { index: number; run: boolean }) {
  const n = useCounter(value, run, 1500 + index * 160)

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={run ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 }}
      className="group relative flex flex-col justify-between gap-6 border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
    >
      <span
        aria-hidden
        className="absolute -top-px left-0 h-px w-0 bg-accent transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full lg:hidden"
      />
      <div>
        <span
          className="display block text-white tabular-nums"
          style={{ fontSize: 'clamp(3rem, 6vw, 5.25rem)', fontVariationSettings: "'wdth' 108" }}
        >
          {n}
          <span className="text-accent">{suffix}</span>
        </span>
        <span className="mt-3 block text-[15px] font-medium text-silver-100">{label}</span>
      </div>
      <span className="text-[13px] leading-relaxed text-silver-400/80">{note}</span>
    </motion.div>
  )
}

export function Metrics() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 })

  return (
    <section className="relative border-y border-white/8 bg-graphite py-16 sm:py-20">
      <div aria-hidden className="grid-field absolute inset-0 opacity-[0.35]" />
      <div ref={ref} className="shell relative">
        <div className="mb-10 flex items-center gap-5 sm:mb-14">
          <span className="label-tech text-accent">Experiência comprovada</span>
          <span aria-hidden className="h-px flex-1 bg-white/10" />
          <span className="label-tech hidden text-silver-400/60 sm:block">
            Mais de 18 anos em campo
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {metrics.map((m, i) => (
            <Metric key={m.label} {...m} index={i} run={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
