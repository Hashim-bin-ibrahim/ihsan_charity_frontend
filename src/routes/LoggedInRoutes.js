import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

export default function LoggedInRoutes() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser)

  return storedUser ? <Outlet /> : <Login />;
}
