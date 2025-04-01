import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import LoginPage from "./pages/login"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginPage} />
      </Routes>
    </Router>
  )
}
