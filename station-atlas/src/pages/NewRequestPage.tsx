import { Link } from "react-router-dom"

export default function NewRequestPage() {
  return (
    <div>
      <Link to="/requests">Retour aux demandes</Link>
      <h1>Nouvelle demande d'amarrage</h1>
    </div>
  )
}
