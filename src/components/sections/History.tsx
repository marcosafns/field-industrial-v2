import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { history } from '../../data/content'
import { Fade, Headline, SectionRule } from '../ui/primitives'

/** Renderiza **negrito** dentro dos parágrafos do conteúdo. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((chunk, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-white">
            {chunk}
          </strong>
        ) : (
          <span key={i}>{chunk}</span>
        ),
      )}
    </>
  )
}

export function History() {
  const rail = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ['start 78%', 'end 55%'],
  })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="trajetoria" className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionRule index={history.index} label={history.kicker} right="2007 → hoje" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-white">
              <Headline lines={history.headline} size="clamp(2rem, 4.2vw, 3.9rem)" />
            </h2>

            <div className="mt-9 max-w-[42rem] space-y-5">
              {history.paragraphs.map((p, i) => (
                <Fade key={i} delay={0.08 * i}>
                  <p className="text-[15.5px] leading-relaxed text-silver-400">
                    <RichText text={p} />
                  </p>
                </Fade>
              ))}
            </div>
          </div>

          {/* Citação do fundador */}
          <Fade delay={0.16} className="lg:col-span-5">
            <figure className="relative h-full border border-white/10 bg-graphite/60 p-8 bevel-tr lg:p-10">
              <span
                aria-hidden
                className="display absolute top-4 right-6 text-[6rem] leading-none text-accent/18"
                style={{ fontWeight: 700 }}
              >
                &rdquo;
              </span>
              <blockquote
                className="display-tight relative text-white"
                style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.45rem)' }}
              >
                {history.quote.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <img
                  src="/media/fernando.jpg"
                  alt={history.quote.author}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 shrink-0 object-cover object-top"
                />
                <span>
                  <span className="block text-[14px] font-medium text-white">
                    {history.quote.author}
                  </span>
                  <span className="label-tech mt-1 block text-silver-400/60">
                    {history.quote.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Fade>
        </div>

        {/* Linha do tempo */}
        <div ref={rail} className="relative mt-20 sm:mt-28">
          {/* trilho */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full"
          />
          <motion.div
            aria-hidden
            style={{ height }}
            className="absolute top-0 left-[7px] w-px origin-top bg-accent lg:hidden"
          />
          <motion.div
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute top-[7px] left-0 hidden h-px w-full origin-left bg-accent lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-8">
            {history.timeline.map((t, i) => (
              <Fade key={t.year} delay={i * 0.08}>
                <li className="relative pl-9 lg:pt-9 lg:pl-0">
                  <span
                    aria-hidden
                    className="absolute top-[2px] left-0 grid h-[15px] w-[15px] place-items-center border border-accent bg-ink lg:top-0"
                  >
                    <span className="h-[5px] w-[5px] bg-accent" />
                  </span>

                  <span
                    className="display block text-accent"
                    style={{ fontSize: '1.35rem', fontVariationSettings: "'wdth' 112" }}
                  >
                    {t.year}
                  </span>
                  <h3 className="mt-2 text-[14.5px] font-semibold text-white">{t.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-silver-400/85">{t.desc}</p>
                </li>
              </Fade>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
