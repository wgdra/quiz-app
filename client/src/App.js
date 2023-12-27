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
import Classes from "./pages/projects/Contents/Classes";
import Method from "./pages/projects/Contents/Method";
import Set from "./pages/projects/Contents/Set";
import Quiz from "./pages/projects/Contents/Quiz";
import Theory from "./pages/projects/Contents/Theory";
import Test from "./pages/projects/Contents/Test";
import Theories from "./pages/admin/Management/theories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<MainAdmin />}>
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/user" element={<User />} />
          <Route path="/manage/synthetic" element={<Synthetic />} />
          <Route path="/manage/theories" element={<Theories />} />
        </Route>
        <Route path="/project" element={<MainProject />}>
          <Route path="/project/overview" element={<OverView />} />
          <Route path="/project/classes" element={<Classes />} />
          <Route path="/project/method" element={<Method />} />
          <Route path="/project/set" element={<Set />} />
          <Route path="/project/quiz" element={<Quiz />} />
          <Route path="/project/theory" element={<Theory />} />
          <Route path="/project/test" element={<Test />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
