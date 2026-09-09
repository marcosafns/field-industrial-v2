import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { services } from '../../data/content'
import { Fade, Headline, SectionRule } from '../ui/primitives'

export function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="servicos" className="relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="grid-field absolute inset-0 opacity-[0.25]" />

      <div className="shell relative">
        <SectionRule
          index={services.index}
          label={services.kicker}
          right="06 frentes de entrega"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 className="text-white lg:col-span-6">
            <Headline lines={services.headline} size="clamp(2rem, 4.2vw, 3.9rem)" />
          </h2>
          <Fade delay={0.15} className="lg:col-span-6">
            <p className="text-[15.5px] leading-relaxed text-silver-400">{services.lede}</p>
          </Fade>
        </div>

        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          {/* Índice */}
          <div className="border-t border-white/10">
            {services.items.map((s, i) => {
              const open = active === i
              return (
                <div key={s.n} className="border-b border-white/10">
                  <h3>
                    <button
                      onClick={() => setActive(open ? -1 : i)}
                      onMouseEnter={() => setActive(i)}
                      aria-expanded={open}
                      className="group flex w-full items-start gap-5 py-6 text-left sm:gap-7 sm:py-7"
                    >
                      <span
                        className={`label-tech mt-2 shrink-0 transition-colors duration-500 ${
                          open ? 'text-accent' : 'text-silver-400/40'
                        }`}
                      >
                        {s.n}
                      </span>

                      <span
                        className={`display-tight flex-1 transition-colors duration-500 ${
                          open ? 'text-white' : 'text-silver-300/85 group-hover:text-white'
                        }`}
                        style={{ fontSize: 'clamp(1.2rem, 2.1vw, 1.85rem)' }}
                      >
                        {s.title}
                      </span>

                      <span
                        aria-hidden
                        className={`relative mt-2 grid h-6 w-6 shrink-0 place-items-center transition-colors duration-500 ${
                          open ? 'text-accent' : 'text-silver-400/50'
                        }`}
                      >
                        <span className="absolute h-px w-3.5 bg-current" />
                        <span
                          className={`absolute h-3.5 w-px bg-current transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open ? 'scale-y-0' : 'scale-y-100'
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-0 sm:pl-[calc(1.5rem+1.75rem)]">
                          {/* Imagem em telas pequenas */}
                          <div className="mb-6 aspect-[16/10] overflow-hidden bevel-sm lg:hidden">
                            <img
                              src={s.image}
                              alt={s.alt}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <p className="max-w-[40rem] text-[14.5px] leading-relaxed text-silver-400">
                            {s.desc}
                          </p>

                          <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                            {s.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2.5 text-[13.5px] text-silver-300/80"
                              >
                                <span aria-hidden className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Visor — acompanha o item ativo */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+3.5rem)]">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bevel-tr bg-graphite-2">
                {services.items.map((s, i) => (
                  <img
                    key={s.n}
                    src={s.image}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? 'scale(1)' : 'scale(1.05)',
                    }}
                  />
                ))}

                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(4,16,31,0.15) 0%, rgba(5,8,12,0.15) 45%, rgba(5,8,12,0.9) 100%)',
                  }}
                />

                {/* mira técnica */}
                <span aria-hidden className="absolute inset-6 border border-white/12" />
                <span
                  aria-hidden
                  className="absolute top-6 left-6 h-4 w-4 border-t border-l border-accent"
                />
                <span
                  aria-hidden
                  className="absolute right-6 bottom-6 h-4 w-4 border-r border-b border-accent"
                />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="label-tech text-accent">
                    {active >= 0 ? services.items[active].n : '--'} / 06
                  </span>
                  <p className="display-tight mt-3 text-[1.25rem] text-white">
                    {active >= 0 ? services.items[active].title : 'Selecione um serviço'}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                {services.items.map((s, i) => (
                  <button
                    key={s.n}
                    onClick={() => setActive(i)}
                    aria-label={`Ver ${s.title}`}
                    className="group relative h-6 flex-1"
                  >
                    <span
                      className={`block h-px w-full transition-colors duration-500 ${
                        active === i ? 'bg-accent' : 'bg-white/18 group-hover:bg-white/40'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
