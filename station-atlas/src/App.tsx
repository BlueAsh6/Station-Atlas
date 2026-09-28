import { Routes, Route } from "react-router-dom"
import AppLayout from "./components/AppLayout"
import DocksPage from "./pages/DocksPage"
import DockDetailPage from "./pages/DockDetailPage"
import RequestsPage from "./pages/RequestsPage"
import NewRequestPage from "./pages/NewRequestPage"
import NotFoundPage from "./pages/NotFoundPage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="docks" element={<DocksPage />} />
        <Route path="docks/:dockId" element={<DockDetailPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="requests/new" element={<NewRequestPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}