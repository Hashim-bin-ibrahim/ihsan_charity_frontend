import React from "react";
import AdminBody from "../../components/admin_body";
import Header from "../../components/Header";
import "./style.css";
export default function AdminPanel() {
  return (
    <div className="admin">
      <Header />
      <AdminBody />
    </div>
  );
}
