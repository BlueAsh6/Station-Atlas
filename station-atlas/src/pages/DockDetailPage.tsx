import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { Dock } from "../types/dock"
import { getDocks } from "../services/docks"

export default function DockDetailPage() {
  const { dockId } = useParams()
  const [dock, setDock] = useState<Dock | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError("")
      try {
        const docks = await getDocks(controller.signal)
        setDock(docks.find(d => d.id === dockId) ?? null)
        setLoading(false)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError("Impossible de charger les quais")
        setLoading(false)
      }
    }

    void load()
    return () => controller.abort()
  }, [dockId])

  if (loading) return <p>Chargement...</p>

  if (error) return <p>{error}</p>

  if (!dock) return (
    <div>
      <h1>Quai introuvable</h1>
      <p>Aucun quai ne correspond à l'identifiant « {dockId} ».</p>
      <Link to="/docks">Retour aux quais</Link>
    </div>
  )

  return (
    <div>
      <Link to="/docks">Retour aux quais</Link>
      <h1>{dock.name}</h1>
      <p>{dock.state === "available" ? "Disponible" : "Bloqué"}</p>

      <p>Identifiant : {dock.id}</p>
      <p>Type : {dock.kind}</p>
      <p>Capacité : {dock.capacityTons} t</p>

      {dock.kind === "crew" && <p>Personnes maximum : {dock.maxPeople}</p>}
      {dock.kind === "cargo" && <p>Nombre de grues : {dock.craneCount}</p>}
      {dock.kind === "service" && <p>Station d'outillage : {dock.toolStation}</p>}
    </div>
  )
}
