import { NavLink, Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <div>
            <header>
                <span>Station Atlas</span>
                <nav>
                    <NavLink to="/docks">Quais</NavLink>
                    <NavLink to="/requests">Demandes</NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}