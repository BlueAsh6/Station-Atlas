import { Link } from "react-router-dom"

export default function RequestsPage() {
  return (
    <div>
      <h1>Demandes d'amarrage</h1>
      <Link to="/requests/new">Nouvelle demande</Link>
      <p>Aucune demande pour le moment.</p>
    </div>
  )
}
