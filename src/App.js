import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
