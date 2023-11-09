import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainAdmin from "./pages/admin/Main";
import Manage from "./pages/admin/Manage";
import User from "./pages/admin/Management/user";
import Synthetic from "./pages/admin/Management/synthetic";
import MainProject from "./pages/projects/Main";
import OverView from "./pages/projects/Overview";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<MainAdmin />}>
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/user" element={<User />} />
          <Route path="/manage/synthetic" element={<Synthetic />} />
        </Route>
        <Route path="/project" element={<MainProject />}>
          <Route path="/project/overview" element={<OverView />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
