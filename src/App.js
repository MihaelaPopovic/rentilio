import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./layouts/Navigation";
import AdminLogin from "./pages/admin-login/AdminLogin";

/*import Home from './Home';
import Rent from './Rent';
import Contact from './Contact'; */

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          {/* <Route path="/rent" element={<Rent />} />
                <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
