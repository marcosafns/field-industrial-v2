import { domains } from '../../data/content'
import { Fade, Headline, SectionRule } from '../ui/primitives'

export function Domains() {
  return (
    <section id="atuacao" className="relative bg-paper py-24 text-navy-900 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionRule
          index={domains.index}
          label={domains.kicker}
          tone="light"
          right="Ciclo do empreendimento"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 className="text-navy-900 lg:col-span-7">
            <Headline lines={domains.headline} size="clamp(2rem, 4.2vw, 3.9rem)" />
          </h2>
          <Fade delay={0.15} className="lg:col-span-5">
            <p className="text-[15.5px] leading-relaxed text-steel">{domains.lede}</p>
          </Fade>
        </div>

        <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-3 lg:gap-8">
          {domains.items.map((d, i) => (
            <Fade key={d.code} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden border border-navy-900/12 bg-white transition-[border-color,transform] duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-navy-900/25">
                {/* chanfro superior direito — cita o corte das placas */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-px -right-px z-20 h-[34px] w-[34px] bg-paper"
                  style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 z-20 h-[48px] w-[48px]"
                  style={{
                    background:
                      'linear-gradient(45deg, transparent calc(50% - 0.5px), rgba(4,16,31,0.14) 50%, transparent calc(50% + 0.5px))',
                  }}
                />

                {/* Imagem */}
                <div className="relative aspect-[16/11] overflow-hidden bg-graphite-2">
                  <img
                    src={d.image}
                    alt={d.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-navy-900/25 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <span className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center bg-accent">
                    <span className="display text-[15px] font-semibold text-white">{d.code}</span>
                  </span>
                </div>

                {/* Corpo */}
                <div className="flex flex-1 flex-col px-6 pt-7 pb-8 sm:px-7">
                  <h3
                    className="display-tight text-navy-900"
                    style={{ fontSize: 'clamp(1.15rem, 1.5vw, 1.4rem)' }}
                  >
                    {d.title}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-10 bg-accent transition-[width] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                  />

                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {d.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] text-steel">
                        <span
                          aria-hidden
                          className="mt-[9px] h-px w-3 shrink-0 bg-navy-900/30 transition-colors duration-500 group-hover:bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}
