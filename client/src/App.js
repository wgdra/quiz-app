import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Manage from "./pages/admin/Manage";
import User from "./pages/admin/Management/user";
import Class from "./pages/admin/Management/class";
import Subject from "./pages/admin/Management/subject";
import Home from "./pages/projects/Home";
import OverView from "./pages/projects/Overview";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Main />}>
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/user" element={<User />} />
          <Route path="/manage/class" element={<Class />} />
          <Route path="/manage/subject" element={<Subject />} />
          <Route path="/overview" element={<OverView />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
