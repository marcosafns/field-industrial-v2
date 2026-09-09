import { about, compliance } from '../../data/content'
import { Fade, ParallaxFigure, Reveal, SectionRule } from '../ui/primitives'

export function About() {
  return (
    <section id="empresa" className="relative bg-ink py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionRule index={about.index} label={about.kicker} right="Field Industrial · 2023" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Coluna editorial */}
          <div className="lg:col-span-7">
            <h2
              className="display text-white"
              style={{ fontSize: 'clamp(2.1rem, 4.6vw, 4.25rem)' }}
            >
              <Reveal delay={0}>Planejamento estratégico</Reveal>
              <Reveal delay={1}>de empreendimentos</Reveal>
              <Reveal delay={2}>
                <span className="text-accent">industriais</span>
              </Reveal>
            </h2>

            <div className="mt-9 max-w-[44rem] space-y-6">
              {about.paragraphs.map((p, i) => (
                <Fade key={i} delay={0.1 + i * 0.09}>
                  <p className="lede text-silver-300">{p}</p>
                </Fade>
              ))}
            </div>

            {/* Conformidade — carimbo técnico */}
            <Fade delay={0.28} className="mt-12">
              <span className="label-tech text-silver-400/60">Conformidade normativa</span>
              <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                {compliance.map((c) => (
                  <li key={c.code} className="border-t border-white/10 pt-3">
                    <span className="display block text-[15px] tracking-[0.06em] text-white">
                      {c.code}
                    </span>
                    <span className="mt-1 block text-[12.5px] leading-snug text-silver-400/75">
                      {c.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>

          {/* Coluna imagem */}
          <div className="lg:col-span-5">
            <Fade delay={0.12}>
              <div className="relative">
                <ParallaxFigure
                  src="/media/team-blueprint.jpg"
                  alt="Engenheiros da Field Industrial analisando prancha técnica em planta industrial"
                  className="aspect-[4/5] bevel-tr"
                  strength={44}
                />
                {/* Legenda técnica sobreposta */}
                <div className="absolute -bottom-px left-0 right-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-6 pt-16 pb-6">
                  <span className="label-tech text-accent">Planejamento</span>
                  <p className="mt-2 max-w-[22rem] text-[13.5px] leading-relaxed text-silver-200">
                    Os maiores desafios de uma obra ou parada são definidos muito antes da execução.
                  </p>
                </div>
              </div>
            </Fade>

            <Fade delay={0.2} className="mt-8">
              <div className="border-l-2 border-accent pl-5">
                <p className="text-[15px] leading-relaxed text-silver-200">
                  Integrando{' '}
                  <strong className="font-semibold text-white">conhecimento técnico</strong>,{' '}
                  <strong className="font-semibold text-white">planejamento</strong> e{' '}
                  <strong className="font-semibold text-white">gestão de riscos</strong> para
                  transformar desafios complexos em resultados previsíveis e sustentáveis.
                </p>
              </div>
            </Fade>
          </div>
        </div>

        {/* Pilares */}
        <div className="mt-20 grid gap-px border-t border-white/10 bg-white/8 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {about.pillars.map((p, i) => (
            <Fade key={p.title} delay={i * 0.07}>
              <article className="group relative h-full bg-ink px-6 pt-8 pb-9 transition-colors duration-500 hover:bg-graphite-2 sm:px-7">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
                <span className="label-tech text-silver-400/40">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-tight mt-5 text-[1.15rem] text-white">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-silver-400">{p.desc}</p>
              </article>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}
