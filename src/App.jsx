import React from "react";
import Navbar from "./components/Navbar";
import Imagens from "./components/Imagens";
import Contatos from "./components/Contatos";
import Lotes from "./components/Lotes";
import Sobre from "./components/Sobre";

export default function App() {
  function scroll(id) {
    const element = document.getElementById(id)
    element.scrollIntoView(true)
    setTimeout(() => {
      window.scrollBy(0, -105)
    }, 700)
  }

  return (
    <div className="main--page">
      <Navbar
        sobreClick = {() => scroll("s-Sobre")}
        fotosClick = {() => scroll("s-Imagens")}
        lotesClick = {() => scroll("s-Lotes")}
        contatoClick = {() => scroll("s-Contatos")}
      />
      <div className="main--body">
        <div id="s-Sobre">
          <Sobre />
        </div>

        <div id="s-Imagens">
          <Imagens/>
        </div>

        <div id="s-Lotes">
          <Lotes />
        </div>

        <div id="s-Contatos">
          <Contatos />
        </div>

      </div>
    </div>
  );
}
