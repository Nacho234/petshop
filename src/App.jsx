import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Brands from './components/Brands'
import Categories from './components/Categories'
import Catalog from './components/Catalog'
import Grooming from './components/Grooming'
import Benefits from './components/Benefits'
import Wholesale from './components/Wholesale'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  // Shared catalog filter so category tiles can jump straight into the grid.
  const [active, setActive] = useState('todos')

  return (
    <div className="min-h-[100dvh] bg-cream">
      <Nav onPick={setActive} />
      <main>
        <Hero />
        <Brands />
        <Categories onPick={setActive} />
        <Catalog active={active} setActive={setActive} />
        <Grooming />
        <Benefits />
        <Wholesale />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
