import { useSearchParams } from 'react-router-dom'
import Catalog from '../components/Catalog'

export default function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const active = params.get('cat') || 'todos'

  // El filtro se refleja en la URL (?cat=...), así el catálogo es enlazable.
  const setActive = (id) =>
    setParams(id && id !== 'todos' ? { cat: id } : {}, { replace: true })

  return <Catalog active={active} setActive={setActive} />
}
