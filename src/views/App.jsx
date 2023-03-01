import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../components/Error";
import Index from "./home/Index";
import Login from "./login/Login";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}

      {/* <Route path="/home" element={<Index />} /> */}

      {/* <Route path="/*" element={<Error />} /> */}

      <Route path="/listing-console" element={<Login />} />

      <Route path="/listing-console/home" element={<Index />} />

      <Route path="/listing-console/*" element={<Error />} />
    </Routes>
  );
}

export default App;
