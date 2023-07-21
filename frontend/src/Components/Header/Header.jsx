import React from "react";
import "./Header.css";
import TopBar from "../TopBar/TopBar";
import MainHeader from "../MainHeader/MainHeader";
import Landing from "../LandingPage/Landing";
export default function Header() {
  return (
    <div>
      <TopBar />
      <MainHeader />
      <Landing />
    </div>
  );
}
