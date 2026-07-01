import { useSearchParams } from 'react-router-dom'
import Catalog from '../components/Catalog'

export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const active = params.get('cat') || 'todos'

  // El filtro se refleja en la URL (?cat=...), así el catálogo es enlazable.
  const setActive = (id) =>
    setParams(id && id !== 'todos' ? { cat: id } : {}, { replace: true })

  return (
    <>
      {/* Banner decorativo arriba del catálogo (card ancha tipo banner) */}
      <div className="mx-auto max-w-[100rem] px-4 pt-9 sm:px-6 lg:px-10 lg:pt-12">
        <div className="overflow-hidden rounded-[1.5rem] border border-line shadow-sm">
          <picture>
            {/* Desktop/tablet: banner alargado. Mobile: banner más cuadrado. */}
            <source media="(min-width: 640px)" srcSet="/banner.png" />
            <img
              src="/bannermobile.png"
              alt="Todo para el bienestar de tu mascota: comida premium y juguetes"
              width={1823}
              height={863}
              className="block h-[200px] w-full object-cover object-center sm:h-[260px] lg:h-[400px]"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
      </div>
      <Catalog active={active} setActive={setActive} />
    </>
  )
}
