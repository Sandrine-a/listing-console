import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../components/Error";
import { GlobalStyle } from "../styles/GlobalStyle";
import Index from "./home/Index";
import Login from "./login/Login";

function App() {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Routes>
        <Route path="/listing-console/" element={<Login />} />

        <Route path="/listing-console/home" element={<Index />} />

        <Route path="/listing-console/*" element={<Error />} />
      </Routes>
    </React.StrictMode>
  );
}

export default App;
