import { philosophy, segments } from '../../data/content'
import { Fade, ParallaxFigure, Reveal } from '../ui/primitives'

export function Philosophy() {
  return (
    <section className="relative bg-navy-900 py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="grid-field absolute inset-0 opacity-[0.22]" />

      <div className="shell relative">
        <div className="flex items-center gap-5 pb-12 sm:pb-16">
          <span className="label-tech text-accent">{philosophy.kicker}</span>
          <span aria-hidden className="h-px flex-1 bg-white/12" />
          <span className="label-tech hidden text-silver-400/60 sm:block">Princípios</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Retrato lateral */}
          <Fade className="lg:col-span-4">
            <ParallaxFigure
              src="/media/engineering-study.jpg"
              alt="Silhueta de engenheira desenvolvendo equacionamento técnico em quadro"
              className="aspect-[4/5] bevel-tr sm:aspect-[16/9] lg:aspect-[3/4]"
              strength={40}
            />
            <div className="mt-5 border-l border-accent pl-4">
              <span className="label-tech text-silver-400/60">Método</span>
              <p className="mt-2 text-[13px] leading-relaxed text-silver-300/80">
                Planejar é reduzir as incertezas a um nível aceitável para a tomada de decisão.
              </p>
            </div>
          </Fade>

          {/* Missão · Visão · Propósito */}
          <div className="lg:col-span-8">
            <h2
              className="display text-white"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.1rem)' }}
            >
              <Reveal delay={0}>O que nos move</Reveal>
              <Reveal delay={1}>
                e nos <span className="text-accent">diferencia</span>
              </Reveal>
            </h2>

            <Fade delay={0.12}>
              <p className="mt-6 max-w-[36rem] text-[15.5px] leading-relaxed text-silver-300/80">
                {philosophy.lede}
              </p>
            </Fade>

            <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-3">
              {philosophy.cards.map((c, i) => (
                <Fade key={c.label} delay={0.08 * i}>
                  <article className="group relative h-full bg-navy-900 px-6 pt-8 pb-9 transition-colors duration-500 hover:bg-navy-800">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                    <h3 className="display text-[1.05rem] tracking-[0.14em] text-white uppercase">
                      {c.label}
                    </h3>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-silver-300/75">{c.text}</p>
                  </article>
                </Fade>
              ))}
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-20 border-t border-white/10 pt-12 sm:mt-28">
          <span className="label-tech text-silver-400/60">Nossos valores</span>
          <ul className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.values.map((v, i) => (
              <Fade key={v.title} delay={(i % 4) * 0.06}>
                <li className="group flex gap-4">
                  <span className="label-tech mt-1 shrink-0 text-accent/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-medium text-white">{v.title}</span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-silver-400/80">
                      {v.desc}
                    </span>
                  </span>
                </li>
              </Fade>
            ))}
          </ul>
        </div>

        {/* Segmentos atendidos */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-4">
            <span className="label-tech mr-2 text-silver-400/60">Segmentos</span>
            {segments.map((s, i) => (
              <Fade key={s} delay={i * 0.04}>
                <span className="border border-white/15 px-4 py-2 text-[12.5px] text-silver-200 transition-colors duration-400 hover:border-accent/60 hover:text-white">
                  {s}
                </span>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
