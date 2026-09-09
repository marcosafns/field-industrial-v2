import { company, contact } from '../../data/content'
import { ActionLink, Fade, Headline } from '../ui/primitives'

const channels = [
  { k: 'Telefone · WhatsApp', v: company.phone, href: company.phoneHref },
  { k: 'E-mail', v: company.email, href: `mailto:${company.email}` },
  { k: 'Escritório', v: `${company.city} · ${company.zip}`, href: null },
  { k: 'Site', v: company.site, href: 'https://fieldindustrial.com.br' },
]

export function Contact() {
  return (
    <section id="contato" className="relative isolate overflow-hidden bg-ink">
      {/* Imagem de fundo tratada */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <img
          src="/media/hero.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #05080C 0%, rgba(4,16,31,0.86) 42%, rgba(5,8,12,0.96) 100%)',
          }}
        />
      </div>
      <div aria-hidden className="grid-field absolute inset-0 -z-10 opacity-25" />

      {/* Divisa em galão — device gráfico da apresentação institucional */}
      <svg
        aria-hidden
        viewBox="0 0 400 900"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute top-0 right-0 -z-10 hidden h-full w-[46%] lg:block"
        fill="none"
      >
        <path d="M40 -60 L400 450 L40 960" stroke="#EF5A18" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M120 -60 L480 450 L120 960" stroke="#8B95A1" strokeOpacity="0.16" strokeWidth="1" />
        <path d="M200 -60 L560 450 L200 960" stroke="#8B95A1" strokeOpacity="0.09" strokeWidth="1" />
      </svg>

      <div className="shell relative py-24 sm:py-32 lg:py-40">
        <div className="flex items-center gap-5 pb-12 sm:pb-16">
          <span className="label-tech text-accent">{contact.kicker}</span>
          <span aria-hidden className="h-px flex-1 bg-white/12" />
          <span className="label-tech hidden text-silver-400/60 sm:block">Resposta em 24h</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-white">
              <Headline lines={contact.headline} size="clamp(2.1rem, 5vw, 4.5rem)" />
            </h2>

            <Fade delay={0.2}>
              <p className="lede mt-8 max-w-[38rem] text-silver-300">{contact.lede}</p>
            </Fade>

            <Fade delay={0.28}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ActionLink href={company.whatsapp} external>
                  Falar no WhatsApp
                </ActionLink>
                <ActionLink href={`mailto:${company.email}`} variant="ghost" className="text-white">
                  Enviar e-mail
                </ActionLink>
              </div>
            </Fade>

            <Fade delay={0.34}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {contact.assurances.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-[13px] text-silver-400">
                    <span aria-hidden className="h-1 w-1 shrink-0 bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </Fade>
          </div>

          {/* Ficha de contato */}
          <Fade delay={0.15} className="lg:col-span-5">
            <div className="relative border border-white/12 bg-graphite/70 backdrop-blur-md bevel-tr">
              <div className="border-b border-white/10 px-7 py-5 sm:px-9">
                <span className="label-tech text-silver-400/60">Canais diretos</span>
              </div>

              <dl>
                {channels.map((c) => (
                  <div
                    key={c.k}
                    className="group border-b border-white/8 px-7 py-5 transition-colors duration-500 hover:bg-white/[0.03] sm:px-9"
                  >
                    <dt className="label-tech text-silver-400/50">{c.k}</dt>
                    <dd className="mt-2 text-[15px] text-white">
                      {c.href ? (
                        <a
                          href={c.href}
                          className="link-underline"
                          {...(c.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {c.v}
                        </a>
                      ) : (
                        c.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="px-7 py-6 sm:px-9">
                <span className="label-tech block text-silver-400/50">Registro</span>
                <p className="mt-2 text-[13px] leading-relaxed text-silver-300">
                  {company.legal}
                  <br />
                  CNPJ {company.cnpj} · {company.crea}
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  )
}
