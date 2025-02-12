import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./components/Home/Home"
import Aboutus from "./components/AboutUs/Aboutus"
import Contactus from "./components/ContactUs/Contactus"
// import SignUp from "./components/SignUp/SignUp"
import LoginPage from "./components/LogIn/Login"
import SignUp from "./components/SignUp/SignUp"

import Stadiums from "./components/Stadiums/Stadiums"
import Reservation from "./components/ReservationPage/ReservationPage"

import ForgotPassword from "./components/LogIn/ForgotPassword"
import LoginLord from "./components/LoginLord/LoginLord"




function App() {

  return (
      // <Router>
      //   <Navbar />
      //   <Routes>
      //     <Route path="/" element = {<Home />}></Route>
      //     <Route path="/aboutUs" element = {<Aboutus />}></Route>
      //     <Route path="/contactUs" element = {<Contactus />}></Route>
      //   </Routes>
      //   <Footer />
      // </Router>
      // <LoginPage/>
      <Router>
        <Navbar/>
      <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/stadiums" element={<Stadiums />} />
      <Route path="/reservation" element={<Reservation />} />

      <Route path="/ForgotPassword" element={<ForgotPassword/>} />
      <Route path="/LoginLord" element={<LoginLord />}/>

    </Routes></Router>
  )
}

export default App
