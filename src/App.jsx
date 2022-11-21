import React from "react";
import Navbar from "./components/Navbar";
import Imagens from "./components/Imagens";
// import Contatos from "./components/Contatos";
// import Lotes from "./components/Lotes";

export default function App() {
  return (
    <div className="mainPage">
      <Navbar />
      <Imagens />
      {/* <Lotes /> */}
      {/* <Contatos /> */}
    </div>
  );
}
