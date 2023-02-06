import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const storedUser = JSON.parse(localStorage?.getItem("user"));
  console.log(storedUser);

  return storedUser ? <Navigate to={"/"} /> : <Outlet />;
}
