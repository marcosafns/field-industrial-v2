import { clients } from '../../data/content'
import { Fade } from '../ui/primitives'

export function Clients() {
  const row = [...clients, ...clients]

  return (
    <section className="marquee relative overflow-hidden border-y border-navy-900/10 bg-paper-2 py-16 sm:py-20">
      <div className="shell">
        <Fade>
          <div className="flex items-center gap-5">
            <span className="label-tech text-accent">Clientes que confiam na Field</span>
            <span aria-hidden className="h-px flex-1 bg-navy-900/12" />
            <span className="label-tech hidden text-steel/70 sm:block">50+ atendidos</span>
          </div>
        </Fade>
      </div>

      <div className="relative mt-12">
        {/* esmaecimento nas bordas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-32"
          style={{ background: 'linear-gradient(90deg, #EAECEF, transparent)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-32"
          style={{ background: 'linear-gradient(270deg, #EAECEF, transparent)' }}
        />

        <ul className="marquee-track flex w-max items-center gap-12 sm:gap-20">
          {row.map((c, i) => (
            <li key={`${c.name}-${i}`} className="shrink-0">
              <img
                src={c.logo}
                alt={i < clients.length ? c.name : ''}
                aria-hidden={i >= clients.length}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto object-contain opacity-45 grayscale transition-[opacity,filter] duration-500 hover:opacity-100 hover:grayscale-0 sm:h-10"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
