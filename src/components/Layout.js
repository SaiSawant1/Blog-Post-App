import { Outlet } from "react-router-dom";
import Hearder from "./Hearder";
import React from "react";

const Layout = () => {
  return (
    <>
      <Hearder />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
