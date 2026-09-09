import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { FieldLogo, FieldMark } from './brand/FieldMark'
import { company, nav } from '../data/content'
import { useActiveSection, useScrollProgress } from '../lib/hooks'

const NAV_IDS = nav.map((n) => n.id)

/* ------------------------------------------------------------------
   Barra utilitária — dados de contato sempre à mão no topo da página.
   Recolhe assim que a leitura começa, devolvendo altura ao conteúdo.
   ------------------------------------------------------------------ */

function UtilityBar({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className="overflow-hidden border-b border-white/8 transition-[height,opacity] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ height: collapsed ? 0 : 38, opacity: collapsed ? 0 : 1 }}
      aria-hidden={collapsed}
    >
      <div className="shell flex h-[38px] items-center justify-between gap-8">
        <span className="label-tech flex items-center gap-2.5 text-silver-400/60">
          <span aria-hidden className="h-1 w-1 shrink-0 bg-accent" />
          <span className="hidden sm:inline">{company.city}</span>
          <span className="sm:hidden">Lençóis Paulista</span>
        </span>

        <div className="flex items-center gap-5 sm:gap-8">
          <a
            href={company.phoneHref}
            className="label-tech text-silver-400/70 transition-colors duration-300 hover:text-white"
          >
            {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="label-tech hidden text-silver-400/70 transition-colors duration-300 hover:text-white md:inline"
          >
            {company.email}
          </a>
          <a
            href={company.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Field Industrial no LinkedIn"
            className="text-silver-400/60 transition-colors duration-300 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V9z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Item de navegação — índice, rótulo e régua que se desenha
   ------------------------------------------------------------------ */

function NavLink({ item, active }: { item: (typeof nav)[number]; active: boolean }) {
  return (
    <a
      href={`#${item.id}`}
      aria-current={active ? 'true' : undefined}
      className="group relative flex flex-col justify-end pt-1 pb-2"
    >
      <span className="flex items-baseline gap-1.5">
        <span
          className={`label-tech text-[8.5px] transition-colors duration-500 ${
            active ? 'text-accent' : 'text-silver-400/35 group-hover:text-accent/70'
          }`}
        >
          {item.index}
        </span>
        <span
          className={`text-[13.5px] font-medium tracking-[0.01em] transition-colors duration-400 ${
            active ? 'text-white' : 'text-silver-300/70 group-hover:text-white'
          }`}
        >
          {item.label}
        </span>
      </span>

      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </a>
  )
}

/* ------------------------------------------------------------------ */

export function Header({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.dataset.locked = menu ? 'true' : 'false'
  }, [menu])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const compact = scrolled && !menu

  return (
    <>
      <motion.header
        initial={{ y: -140 }}
        animate={{ y: ready ? 0 : -140 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: ready ? 0.4 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`relative transition-[background-color,backdrop-filter] duration-500 ${
            compact || menu ? 'bg-ink/82 backdrop-blur-2xl' : 'bg-gradient-to-b from-ink/70 to-transparent'
          }`}
        >
          <UtilityBar collapsed={compact} />

          <div
            className="shell flex items-center justify-between gap-6 transition-[height] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ height: compact ? 62 : 78 }}
          >
            <a
              href="#topo"
              aria-label="Field Industrial — início"
              className="group shrink-0 transition-opacity duration-300 hover:opacity-85"
            >
              <FieldLogo
                height={compact ? '2rem' : '2.4rem'}
                className="transition-[height,font-size] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </a>

            <nav className="hidden items-stretch gap-8 self-stretch lg:flex" aria-label="Seções">
              {nav.map((item) => (
                <NavLink key={item.id} item={item} active={active === item.id} />
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hidden overflow-hidden border border-white/20 bevel-sm px-5 py-2.5 transition-colors duration-500 hover:border-accent sm:block"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <span className="label-tech relative z-10 flex items-center gap-2.5 text-white">
                  Falar com a Field
                  <svg viewBox="0 0 16 10" className="h-[8px] w-[13px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" fill="none" aria-hidden>
                    <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
              </a>

              <button
                onClick={() => setMenu((v) => !v)}
                aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menu}
                className="group relative grid h-10 w-10 place-items-center border border-white/18 transition-colors duration-400 hover:border-accent lg:hidden"
              >
                <span className="flex flex-col items-center gap-[5px]">
                  <span
                    className={`block h-px w-[18px] bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      menu ? 'translate-y-[6px] rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`block h-px w-[18px] bg-white transition-opacity duration-300 ${
                      menu ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-px w-[18px] bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      menu ? '-translate-y-[6px] -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Fio inferior: régua discreta + avanço da leitura */}
          <div
            className="absolute inset-x-0 bottom-0 h-px transition-colors duration-500"
            style={{ background: compact || menu ? 'rgba(255,255,255,0.10)' : 'transparent' }}
          >
            <div
              className="h-full origin-left bg-accent transition-opacity duration-500"
              style={{
                transform: `scaleX(${progress})`,
                opacity: compact ? 1 : 0,
                willChange: 'transform',
              }}
            />
          </div>
        </div>
      </motion.header>

      {/* Menu em tela cheia */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div aria-hidden className="grid-field absolute inset-0 opacity-25" />
            <FieldMark
              variant="mono"
              className="pointer-events-none absolute -right-10 bottom-8 h-[46vh] w-auto text-white opacity-[0.05]"
            />

            <nav
              className="shell relative z-10 flex flex-1 flex-col justify-center"
              aria-label="Seções"
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.055, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b border-white/8 py-4"
                >
                  <span className="label-tech text-[9px] text-accent">{item.index}</span>
                  <span
                    className="display text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                    style={{ fontSize: 'clamp(1.75rem,8vw,2.75rem)' }}
                  >
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="shell relative z-10 flex flex-col gap-4 pb-10"
            >
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="label-tech flex items-center justify-between bg-accent px-5 py-4 text-white bevel-sm"
              >
                Falar no WhatsApp
                <svg viewBox="0 0 16 10" className="h-[9px] w-[15px]" fill="none" aria-hidden>
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
              <div className="flex flex-col gap-1 pt-1">
                <a href={company.phoneHref} className="text-[15px] text-silver-200">
                  {company.phone}
                </a>
                <a href={`mailto:${company.email}`} className="text-[13px] text-silver-400">
                  {company.email}
                </a>
                <span className="label-tech mt-2 text-silver-400/50">{company.city}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
