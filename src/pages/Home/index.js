import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/Header";
import Home_Body from "../../components/home_body";
import './style.css'

export default function Home() {
  const [user, setUser] = useState({});


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser?.user);
    }
  }, []);



  return <div className="home">
    <Header user={user}/>
    <Home_Body user={user}/>
    <Footer/>

  </div>;
}
