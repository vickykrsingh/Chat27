import { Route, Routes } from "react-router-dom"
import Home from './pages/home.jsx'
import Navbar from "./components/Navbar.jsx"
export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}