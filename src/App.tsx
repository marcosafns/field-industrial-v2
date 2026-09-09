import { useEffect, useState } from 'react'
import { Preloader } from './components/Preloader'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './components/sections/Hero'
import { Metrics } from './components/sections/Metrics'
import { About } from './components/sections/About'
import { Domains } from './components/sections/Domains'
import { Services } from './components/sections/Services'
import { Method } from './components/sections/Method'
import { WhyField } from './components/sections/WhyField'
import { History } from './components/sections/History'
import { Philosophy } from './components/sections/Philosophy'
import { Clients } from './components/sections/Clients'
import { Contact } from './components/sections/Contact'
import { useScrollProgress, useSmoothScroll } from './lib/hooks'

function ProgressRail({ active }: { active: boolean }) {
  const p = useScrollProgress()
  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[60] h-px w-full bg-transparent transition-opacity duration-500"
      style={{ opacity: active ? 1 : 0 }}
    >
      <div
        className="h-full origin-left bg-accent"
        style={{ transform: `scaleX(${p})`, willChange: 'transform' }}
      />
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)

  useSmoothScroll(ready)

  useEffect(() => {
    document.body.dataset.locked = ready ? 'false' : 'true'
    if (!ready) window.scrollTo(0, 0)
  }, [ready])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <ProgressRail active={ready} />

      <a
        href="#empresa"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Header ready={ready} />

      <main>
        <Hero ready={ready} />
        <Metrics />
        <About />
        <Domains />
        <Services />
        <Method />
        <WhyField />
        <History />
        <Philosophy />
        <Clients />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
