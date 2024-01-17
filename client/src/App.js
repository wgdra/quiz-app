import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainAdmin from "./pages/admin/Main";
import Manage from "./pages/admin/Manage";
import User from "./pages/admin/Management/user";
import Synthetic from "./pages/admin/Management/synthetic";
import Error from "./pages/Error";
import Theories from "./pages/admin/Management/theories";
import Exam from "./pages/admin/Management/exam";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import {
  MainProject,
  OverView,
  Classes,
  Method,
  Set,
  Quiz,
  Theory,
  Test,
  Profile,
  ChatApp,
} from "./pages/projects/ProjectRoute";
import { ProtectedAdmin } from "./context/ProtectedRoles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          path="/manage"
          element={
            <ProtectedAdmin>
              <MainAdmin />
            </ProtectedAdmin>
          }
        >
          <Route path="/manage" element={<Manage />} />
          <Route path="/manage/user" element={<User />} />
          <Route path="/manage/synthetic" element={<Synthetic />} />
          <Route path="/manage/theories" element={<Theories />} />
          <Route path="/manage/exam" element={<Exam />} />
        </Route>

        <Route path="/project" element={<MainProject />}>
          <Route path="/project/overview" element={<OverView />} />
          <Route path="/project/chat" element={<ChatApp />} />
          <Route path="/project/classes" element={<Classes />} />
          <Route path="/project/method" element={<Method />} />
          <Route path="/project/set" element={<Set />} />
          <Route path="/project/quiz" element={<Quiz />} />
          <Route path="/project/theory" element={<Theory />} />
          <Route path="/project/test" element={<Test />} />
          <Route path="/project/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
