import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { Dock } from "../types/dock"
import { getDocks } from "../services/docks"

export default function DocksPage() {
  const [docks, setDocks] = useState<Dock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError("")
      try {
        const data = await getDocks(controller.signal)
        setDocks(data)
        setLoading(false)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError("Impossible de charger les quais")
        setLoading(false)
      }
    }

    void load()
    return () => controller.abort()
  }, [retryCount])

  const visible = docks.filter(dock => {
    const matchQuery = dock.name.toLowerCase().includes(query.toLowerCase())
    const matchFilter =
      filter === "all" ||
      (filter === "available" && dock.state === "available") ||
      (filter === "blocked" && dock.state === "blocked")
    return matchQuery && matchFilter
  })

  if (loading) return <p>Chargement...</p>

  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={() => setRetryCount(c => c + 1)}>Réessayer</button>
    </div>
  )

  if (docks.length === 0) return <p>Aucun quai disponible dans le manifeste</p>

  return (
    <div>
      <h1>Quais d'amarrage</h1>
      <p>{visible.length} résultat(s)</p>

      <div>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher par nom"
        />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Tous</option>
          <option value="available">Disponible</option>
          <option value="blocked">Bloqué</option>
        </select>
        <button onClick={() => { setQuery(""); setFilter("all") }}>Réinitialiser</button>
      </div>

      {visible.length === 0 ? (
        <div>
          <p>Aucun quai ne correspond à votre recherche</p>
          <button onClick={() => { setQuery(""); setFilter("all") }}>Réinitialiser</button>
        </div>
      ) : (
        <div>
          {visible.map(dock => (
            <Link to={`/docks/${dock.id}`} key={dock.id}>
              <div>
                <p>{dock.name}</p>
                <p>{dock.id}</p>
                <p>{dock.kind}</p>
                <p>{dock.state === "available" ? "Disponible" : "Bloqué"}</p>
                <p>{dock.capacityTons} t</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}