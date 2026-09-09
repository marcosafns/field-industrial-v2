import { FieldLogo } from './brand/FieldMark'
import { company, nav } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-ink">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <FieldLogo height="3rem" />
            <p className="label-tech mt-5 text-silver-400/70">
              Turning challenges <span className="text-accent">into</span> opportunity
            </p>
            <p className="mt-6 max-w-[26rem] text-[13.5px] leading-relaxed text-silver-400">
              Planejamento estratégico de empreendimentos industriais — grandes paradas de
              manutenção, engenharia mecânica e obras.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Seções do site">
            <span className="label-tech text-silver-400/50">Navegação</span>
            <ul className="mt-5 flex flex-col gap-2.5">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="group flex items-baseline gap-3 text-[14px] text-silver-300 transition-colors hover:text-white"
                  >
                    <span className="label-tech text-[9px] text-silver-400/35 transition-colors group-hover:text-accent">
                      {n.index}
                    </span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <span className="label-tech text-silver-400/50">Contato</span>
            <ul className="mt-5 flex flex-col gap-2.5 text-[14px]">
              <li>
                <a href={company.phoneHref} className="link-underline text-silver-200">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="link-underline text-silver-200">
                  {company.email}
                </a>
              </li>
              <li className="text-silver-400">
                {company.city} · {company.zip}
              </li>
            </ul>

            <a
              href={company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2.5"
            >
              <span className="grid h-8 w-8 place-items-center border border-white/15 transition-colors duration-400 group-hover:border-accent group-hover:bg-accent">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current text-white" aria-hidden>
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V9z" />
                </svg>
              </span>
              <span className="label-tech text-silver-400 transition-colors group-hover:text-white">
                /fieldindustrial
              </span>
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-tech text-silver-400/45">
            © {year} {company.name} — Todos os direitos reservados
          </p>
          <p className="label-tech text-silver-400/45">
            {company.legal} · CNPJ {company.cnpj} · {company.crea}
          </p>
        </div>
      </div>
    </footer>
  )
}
