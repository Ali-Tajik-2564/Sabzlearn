import React, { useState, useEffect } from "react";
import "./Header.css";
import TopBar from "../TopBar/TopBar";
import MainHeader from "../MainHeader/MainHeader";
import Landing from "../LandingPage/Landing";
export default function Header() {
  const [info, setInfo] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/index")
      .then(res => res.json())
      .then(result => setInfo(result))

  }, [])
  return (
    <div>
      <TopBar />
      <MainHeader />
      <Landing info={info} />
    </div>
  );
}
