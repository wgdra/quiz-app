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
import Exam from "./pages/admin/Management/exam";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/" element={<MainAdmin />}>
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/user" element={<User />} />
          <Route path="/manage/synthetic" element={<Synthetic />} />
          <Route path="/manage/theories" element={<Theories />} />
          <Route path="/manage/exam" element={<Exam />} />
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
