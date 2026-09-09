import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { FieldLogo } from './brand/FieldMark'
import { company, nav } from '../data/content'
import { useActiveSection } from '../lib/hooks'

const NAV_IDS = nav.map((n) => n.id)

export function Header({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const active = useActiveSection(NAV_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
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

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: ready ? 0 : -90 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: ready ? 0.35 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-500 ${
            scrolled || menu
              ? 'border-b border-white/8 bg-ink/78 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between gap-8">
            <a href="#topo" aria-label="Field Industrial — início" className="shrink-0">
              <FieldLogo height="2.35rem" />
            </a>

            <nav className="hidden items-center gap-9 lg:flex" aria-label="Seções">
              {nav.map((item) => {
                const on = active === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group relative flex items-baseline gap-2 py-2"
                  >
                    <span
                      className={`label-tech text-[9px] transition-colors duration-300 ${
                        on ? 'text-accent' : 'text-silver-400/45'
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      className={`text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 ${
                        on ? 'text-white' : 'text-silver-300/75 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hidden overflow-hidden bevel-sm border border-white/18 px-5 py-2.5 sm:block"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <span className="label-tech relative z-10 text-white">Falar com a Field</span>
              </a>

              <button
                onClick={() => setMenu((v) => !v)}
                aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menu}
                className="relative grid h-11 w-11 place-items-center border border-white/15 lg:hidden"
              >
                <span className="flex flex-col items-end gap-[5px]">
                  <span
                    className={`block h-px bg-white transition-all duration-400 ${menu ? 'w-4 translate-y-[6px] rotate-45' : 'w-5'}`}
                  />
                  <span
                    className={`block h-px bg-white transition-all duration-300 ${menu ? 'w-0 opacity-0' : 'w-3.5'}`}
                  />
                  <span
                    className={`block h-px bg-white transition-all duration-400 ${menu ? 'w-4 -translate-y-[6px] -rotate-45' : 'w-5'}`}
                  />
                </span>
              </button>
            </div>
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
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <div aria-hidden className="grid-field absolute inset-0 opacity-25" />
            <nav className="shell relative z-10 flex flex-1 flex-col justify-center gap-1 pt-[var(--header-h)]">
              {nav.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-5 border-b border-white/8 py-5"
                >
                  <span className="label-tech text-accent">{item.index}</span>
                  <span
                    className="display text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2"
                    style={{ fontSize: 'clamp(2rem,9vw,3.25rem)' }}
                  >
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="shell relative z-10 flex flex-col gap-1 pb-10">
              <a href={company.phoneHref} className="text-silver-200">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="text-silver-400 text-sm">
                {company.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
