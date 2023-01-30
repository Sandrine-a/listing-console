import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../components/Error";
import Index from "./home/Index";
import Login from "./login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Index />} />

        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
