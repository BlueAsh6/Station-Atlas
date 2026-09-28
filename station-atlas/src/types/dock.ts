interface DockBase {
  readonly id: string
  name: string
  kind: "crew" | "cargo" | "service"
  state: "available" | "blocked"
  capacityTons: number
}

interface CrewDock extends DockBase {
  kind: "crew"
  maxPeople: number
}

interface CargoDock extends DockBase {
  kind: "cargo"
  craneCount: number
}

interface ServiceDock extends DockBase {
  kind: "service"
  toolStation: string
}

export type Dock = CrewDock | CargoDock | ServiceDock
