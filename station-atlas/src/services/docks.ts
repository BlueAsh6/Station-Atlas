import type { Dock } from "../types/dock"
import { adaptDock } from "./adaptDock"

export async function getDocks(signal?: AbortSignal): Promise<Dock[]> {
  const response = await fetch("/api/docks.json", { signal })

  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`)

  const data: unknown = await response.json()

  if (!Array.isArray(data)) throw new Error("Réponse invalide")

  return data.map(adaptDock)
}
