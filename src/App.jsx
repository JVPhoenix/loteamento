import React from "react";
import Navbar from "./Components/Navbar";
import Imagens from "./Components/Imagens";
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
