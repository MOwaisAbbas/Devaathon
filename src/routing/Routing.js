import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "../pages/Signup"
import PersistentDrawerLeft from "../pages/Home"
import SignIn from "../pages/Login"
import Profilee from "../pages/Profile"
import Enroll from "../pages/Enroll"

function Routing() {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path="/home" element={<PersistentDrawerLeft />} />
          <Route path="/profile" element={<Profilee />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Routing;
