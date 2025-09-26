import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { CatProvider } from "./contexts/CatContext";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <CatProvider>
          <NavBar />
          <main className="flex-1 min-h-0 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>
          </main>
        </CatProvider>
      </div>
    </>
  );
}

export default App;
