import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import AgentDetails from "./pages/agentDetails";
import MapDetails from "./pages/mapDetails";
import WeaponDetails from './pages/weaponDetails';
import WeaponSkin from './pages/weaponSkin';
import WeaponSkinDetails from './pages/weaponSkinDetails';


import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp, faMailchimp } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faFacebook, faGithub, faInstagram, faLinkedin, faWhatsapp, faMailchimp, faHeart);


import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <div className="w-full min-h-screen bg-gray-900">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/agents/:uuid" element={<AgentDetails />} />
          <Route path="/maps/:uuid" element={<MapDetails />} />
          <Route path="/weapons" element={<WeaponDetails />} />
          <Route path="/weapons/:uuid" element={<WeaponSkin />} />
          <Route path="/weapon-skins/:uuid/:skinUuid" element={<WeaponSkinDetails />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
