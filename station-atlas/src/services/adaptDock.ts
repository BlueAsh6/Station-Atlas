import type { DockDTO } from "../types/dto"
import type { Dock } from "../types/dock"

export function adaptDock(raw: unknown): Dock {
    const dto = raw as DockDTO

    const base = {
        id: dto.dock_id,
        name: dto.label,
        state: dto.state == "OPEN" ? "available" as const : "blocked" as const,
        capacityTons : dto.limit_tons,
    }

if (dto.kind == "crew") {
    if (dto.max_people == undefined) throw new Error("max_people manquant")
    return {...base, kind: "crew", maxPeople: dto.max_people }
}

if (dto.kind == "cargo") {
    if (dto.crane_count == undefined) throw new Error("crane_count manquant")
    return {...base, kind: "cargo", craneCount: dto.crane_count }
}

if (dto.kind == "service") {
    if (dto.tool_station == undefined) throw new Error("tool_station manquant")
    return {...base, kind: "service", toolStation: dto.tool_station }
}

    throw new Error ("kind inconnu")

}
