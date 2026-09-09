/**
 * Símbolo Field Industrial — vetorização das duas placas metálicas
 * do manual de identidade (placa naval ao fundo, placa em aço à frente
 * com o rasgo que forma o "F").
 *
 * Geometria traçada a partir da arte original: as arestas verticais
 * permanecem verticais e as horizontais seguem a mesma inclinação
 * isométrica (~ -30°), como no símbolo impresso.
 */

export const MARK_VIEWBOX = '0 0 700 1350'

/** Placa naval (traseira) */
export const PLATE_BACK = 'M0 228 L390 0 L408 383 L310 458 L275 1248 L10 1088 Z'

/** Placa em aço (frontal) com o rasgo do "F" — regra evenodd */
export const PLATE_FRONT =
  'M332 510 L698 296 L695 1128 L338 1348 Z M310 672 L492 566 L502 652 L320 758 Z'

type Props = {
  className?: string
  /** 'brand' = naval + aço · 'mono' = uma cor só */
  variant?: 'brand' | 'mono'
  title?: string
}

let uid = 0

export function FieldMark({ className, variant = 'brand', title }: Props) {
  const id = `fm${(uid = (uid + 1) % 1e6)}`

  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      {variant === 'brand' && (
        <defs>
          <linearGradient id={`${id}-back`} x1="0" y1="0" x2="1" y2="0.85">
            <stop offset="0" stopColor="#2C4A63" />
            <stop offset="0.45" stopColor="#1B3448" />
            <stop offset="1" stopColor="#0C1E2C" />
          </linearGradient>
          <linearGradient id={`${id}-front`} x1="0.05" y1="0" x2="0.95" y2="1">
            <stop offset="0" stopColor="#E8EBEE" />
            <stop offset="0.18" stopColor="#9AA3AC" />
            <stop offset="0.46" stopColor="#6E767E" />
            <stop offset="0.72" stopColor="#8D959D" />
            <stop offset="1" stopColor="#565D64" />
          </linearGradient>
        </defs>
      )}

      <path
        d={PLATE_BACK}
        fill={variant === 'brand' ? `url(#${id}-back)` : 'currentColor'}
        fillOpacity={variant === 'brand' ? 1 : 0.55}
      />
      <path
        d={PLATE_FRONT}
        fillRule="evenodd"
        fill={variant === 'brand' ? `url(#${id}-front)` : 'currentColor'}
      />
    </svg>
  )
}

/**
 * Logotipo completo — símbolo + assinatura tipográfica.
 * A palavra FIELD usa o eixo de largura da Archivo para reproduzir
 * o lettering expandido do original sem depender de imagem.
 */
export function FieldLogo({
  height = '2.5rem',
  className = '',
  tone = 'light',
  showTagline = false,
}: {
  /** Altura do símbolo. Todo o lockup é dimensionado em `em` a partir dela. */
  height?: string
  className?: string
  tone?: 'light' | 'dark'
  showTagline?: boolean
}) {
  const primary = tone === 'light' ? 'text-white' : 'text-navy-900'
  const secondary = tone === 'light' ? 'text-silver-400' : 'text-steel'

  return (
    <span
      className={`inline-flex items-center gap-[0.3em] ${className}`}
      style={{ height, fontSize: height, lineHeight: 1 }}
    >
      <FieldMark className="h-full w-auto shrink-0" title="Field Industrial" />

      <span
        aria-hidden
        className={`mx-[0.16em] h-[72%] w-px shrink-0 ${
          tone === 'light' ? 'bg-white/25' : 'bg-navy-900/22'
        }`}
      />

      <span className="flex flex-col justify-center">
        <span
          className={`display ${primary}`}
          style={{
            fontSize: '0.56em',
            lineHeight: 1,
            fontVariationSettings: "'wdth' 125",
            fontWeight: 400,
            letterSpacing: '0.15em',
            textIndent: '0.15em',
          }}
        >
          FIELD
        </span>

        <span
          className={`${secondary} mt-[0.055em] flex items-center gap-[0.5em]`}
          style={{ fontSize: '0.2em', lineHeight: 1 }}
        >
          <span aria-hidden className="h-px w-[1.1em] shrink-0 bg-current opacity-55" />
          <span
            className="display whitespace-nowrap"
            style={{ fontVariationSettings: "'wdth' 112", letterSpacing: '0.26em', fontWeight: 400 }}
          >
            INDUSTRIAL
          </span>
          <span aria-hidden className="h-px w-[1.1em] shrink-0 bg-current opacity-55" />
        </span>

        {showTagline && (
          <span
            className={`label-tech mt-[0.42em] whitespace-nowrap ${
              tone === 'light' ? 'text-silver-400/80' : 'text-steel'
            }`}
            style={{ fontSize: '0.155em', letterSpacing: '0.2em' }}
          >
            Turning challenges <span className="text-accent">into</span> opportunity
          </span>
        )}
      </span>
    </span>
  )
}
