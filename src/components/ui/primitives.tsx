import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'

/* ------------------------------------------------------------------
   Reveal — deslocamento curto sob máscara. Sem blur, sem escala.
   ------------------------------------------------------------------ */

const revealVariants: Variants = {
  hidden: { y: '108%' },
  shown: (i: number) => ({
    y: '0%',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.075 },
  }),
}

/**
 * O gatilho de viewport fica no elemento que recorta (a máscara), nunca no
 * conteúdo deslocado: um filho empurrado para fora do recorte tem área de
 * interseção zero e o IntersectionObserver jamais dispararia.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.span
      /* py/-my: evita que a máscara corte acentos e descendentes */
      className={`block overflow-hidden py-[0.14em] -my-[0.14em] ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.span variants={revealVariants} custom={delay} className="block">
        {children}
      </motion.span>
    </motion.span>
  )
}

/** Fade + subida discreta — para blocos de texto corrido. */
export function Fade({
  children,
  delay = 0,
  y = 18,
  className = '',
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------
   Título de seção

   As linhas vêm prontas do conteúdo, uma por entrada, para que a
   quebra seja uma decisão editorial e não um acidente de largura.
   Trecho entre *asteriscos* recebe o acento laranja.
   ------------------------------------------------------------------ */

export function Headline({
  lines,
  className = '',
  size,
}: {
  lines: readonly string[]
  className?: string
  size: string
}) {
  return (
    <span className={`display block ${className}`} style={{ fontSize: size }}>
      {lines.map((line, i) => (
        <Reveal key={line} delay={i}>
          {line.split(/\*(.+?)\*/g).map((chunk, j) =>
            j % 2 === 1 ? (
              <span key={j} className="text-accent">
                {chunk}
              </span>
            ) : (
              <span key={j}>{chunk}</span>
            ),
          )}
        </Reveal>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------
   Régua de seção — a "divisória" técnica que separa os capítulos
   ------------------------------------------------------------------ */

export function SectionRule({
  index,
  label,
  tone = 'dark',
  right,
}: {
  index: string
  label: string
  tone?: 'dark' | 'light'
  right?: string
}) {
  const line = tone === 'dark' ? 'bg-white/12' : 'bg-navy-900/12'
  const dim = tone === 'dark' ? 'text-silver-400/70' : 'text-steel/80'

  return (
    <div className="flex items-center gap-5 pb-10 sm:gap-8 sm:pb-14">
      <span className="label-tech text-accent shrink-0">{index}</span>
      <span aria-hidden className={`h-px w-6 shrink-0 sm:w-10 ${line}`} />
      <span className={`label-tech shrink-0 ${tone === 'dark' ? 'text-white' : 'text-navy-900'}`}>
        {label}
      </span>
      <span aria-hidden className={`h-px flex-1 ${line}`} />
      {right && <span className={`label-tech hidden shrink-0 sm:block ${dim}`}>{right}</span>}
    </div>
  )
}

/* ------------------------------------------------------------------
   Botão — chanfro no canto, preenchimento que sobe
   ------------------------------------------------------------------ */

export function ActionLink({
  href,
  children,
  variant = 'solid',
  className = '',
  external,
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  external?: boolean
}) {
  const base =
    'group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 label-tech transition-colors duration-500 bevel-sm'

  const skin =
    variant === 'solid' ? 'bg-accent text-white' : 'border border-current/25 text-current'

  return (
    <a
      href={href}
      className={`${base} ${skin} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {variant === 'ghost' && (
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
        />
      )}
      <span
        className={`relative z-10 transition-colors duration-300 ${
          variant === 'ghost' ? 'group-hover:text-white' : ''
        }`}
      >
        {children}
      </span>
      <span className="relative z-10 overflow-hidden">
        <svg
          viewBox="0 0 16 10"
          className="h-[9px] w-[15px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          fill="none"
          aria-hidden
        >
          <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
    </a>
  )
}

/* ------------------------------------------------------------------
   Figura com paralaxe contido (imagem maior que a moldura)
   ------------------------------------------------------------------ */

export function ParallaxFigure({
  src,
  alt,
  className = '',
  strength = 60,
  priority,
}: {
  src: string
  alt: string
  className?: string
  strength?: number
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return (
    <div ref={ref} className={`relative overflow-hidden bg-graphite-2 ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, height: `calc(100% + ${strength * 2}px)`, top: -strength }}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className="absolute inset-x-0 w-full object-cover"
      />
    </div>
  )
}

/* ------------------------------------------------------------------
   Marca d'água numérica — profundidade tipográfica
   ------------------------------------------------------------------ */

export function GhostIndex({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={`display pointer-events-none select-none leading-none ${className}`}
      style={{ fontVariationSettings: "'wdth' 125", fontWeight: 700 }}
    >
      {children}
    </span>
  )
}
