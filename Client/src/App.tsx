import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CreatorEdit from "./pages/CreatorEdit";
import TodoDetail from "./pages/TodoDetail";

function Mainlayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route element={<Mainlayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/info" element={<CreatorEdit />} />
          <Route path="/home/detail" element={<TodoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
