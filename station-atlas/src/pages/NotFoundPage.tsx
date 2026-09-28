import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div>
      <h1>Page introuvable</h1>
      <p>Cette adresse n'existe pas.</p>
      <Link to="/docks">Aller aux quais</Link>
    </div>
  )
}
