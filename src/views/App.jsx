import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../components/Error";
import Index from "./home/Index";
import Login from "./login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/listing-console/" element={<Login />} />

        <Route path="/listing-console/home" element={<Index />} />

        <Route path="/listing-console/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
