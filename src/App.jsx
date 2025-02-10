import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Home/Home"
import Aboutus from "./components/AboutUs/Aboutus"
import Contactus from "./components/ContactUs/Contactus"



function App() {

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Home />}></Route>
          <Route path="/aboutUs" element = {<Aboutus />}></Route>
          <Route path="/contactUs" element = {<Contactus />}></Route>
        </Routes>
        <Footer />
      </Router>
  )
}

export default App
