import "./assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import NavWrapper from "./layouts/Navbar";
import SideWrapper from "./layouts/Sidebar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SideWrapper />} />
      <Route path="/" element={<NavWrapper />}>
        <Route path="/home" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
      </Route>
    </Routes>
  );
}

export default App;
