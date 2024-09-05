import { Routes, Route } from "react-router-dom"
import NavBar from "./Components/Navbar"
import Home from "./Home/Home"
import Details from "./Details/Details"
import Favourites from "./Favourites/Favourites"

function App() {


  return (
    <>
      <div className="bg-slate-200 text-gray-600 text-lg">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Favourites/Favourites.jsx" element={<Favourites />} />
          <Route path="/Details/Details.jsx/:id" element={<Details />} />
        </Routes>
      </div>
    </>
  )
}

export default App
