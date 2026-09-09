import { why } from '../../data/content'
import { Fade, GhostIndex, Reveal, SectionRule } from '../ui/primitives'

export function WhyField() {
  return (
    <section className="relative bg-paper py-24 text-navy-900 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionRule index={why.index} label={why.kicker} tone="light" right="Diferenciais" />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2
            className="display text-navy-900 lg:col-span-7"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.9rem)' }}
          >
            <Reveal delay={0}>Mais do que entregar projetos,</Reveal>
            <Reveal delay={1}>
              entregamos <span className="text-accent">previsibilidade</span>
            </Reveal>
          </h2>
          <Fade delay={0.15} className="lg:col-span-5">
            <p className="text-[15.5px] leading-relaxed text-steel">{why.lede}</p>
          </Fade>
        </div>

        {/* Grade de diferenciais */}
        <div className="mt-16 grid gap-px border-t border-navy-900/12 bg-navy-900/12 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => (
            <Fade key={item.title} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden bg-paper px-7 pt-9 pb-10 transition-colors duration-[600ms] hover:bg-white lg:px-9 lg:pt-11 lg:pb-12">
                <GhostIndex className="absolute -top-3 right-4 text-[5.5rem] text-navy-900/[0.045] transition-colors duration-700 group-hover:text-accent/10">
                  {String(i + 1).padStart(2, '0')}
                </GhostIndex>

                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                <h3 className="display-tight relative text-[1.2rem] text-navy-900">{item.title}</h3>
                <p className="relative mt-4 max-w-[26rem] text-[14px] leading-relaxed text-steel">
                  {item.desc}
                </p>
              </article>
            </Fade>
          ))}
        </div>

        {/* Faixa de fechamento */}
        <Fade delay={0.1} className="mt-14 sm:mt-20">
          <div className="relative overflow-hidden bg-navy-900 px-8 py-10 bevel-tr sm:px-12 sm:py-14">
            <div aria-hidden className="grid-field absolute inset-0 opacity-30" />
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1 bg-accent"
            />
            <p
              className="display-tight relative max-w-[46rem] text-white"
              style={{ fontSize: 'clamp(1.25rem, 2.6vw, 2.1rem)' }}
            >
              <span className="block text-silver-300/70">{why.banner.lead}</span>
              <span className="mt-1 block">
                {why.banner.strong} <span className="text-accent">{why.banner.accent}</span>
              </span>
            </p>
          </div>
        </Fade>
      </div>
    </section>
  )
}
