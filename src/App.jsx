import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Catalog from './components/Catalog'
import Benefits from './components/Benefits'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  // Shared catalog filter so category tiles can jump straight into the grid.
  const [active, setActive] = useState('todos')

  return (
    <div className="min-h-[100dvh] bg-cream">
      <Nav />
      <main>
        <Hero />
        <Categories onPick={setActive} />
        <Catalog active={active} setActive={setActive} />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
