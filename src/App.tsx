import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import BingoPage from "./pages/bingo"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bingo" Component={BingoPage} />
        <Route path="/" Component={BingoPage} />
      </Routes>
    </Router>
  )
}
