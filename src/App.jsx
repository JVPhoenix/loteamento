import React, { useRef } from "react";
import Navbar from "./Components/Navbar";
import Imagens from "./Components/Imagens";
import Contatos from "./Components/Contatos";
import Lotes from "./Components/Lotes";

export default function App() {
  const imagens = useRef(null)
  const lotes = useRef(null)
  const contatos = useRef(null)

  return (
    <div className="mainPage">
      <Navbar
        fotosClick = {()=> imagens.current?.scrollIntoView({behavior: "smooth", block:"center"})}
        lotesClick = {()=> lotes.current?.scrollIntoView({behavior: "smooth", block:"center"})}
        contatoClick = {()=> contatos.current?.scrollIntoView({behavior: "smooth", block:"center"})}
      />
      
      <div ref={imagens} className="">
        <Imagens/>
      </div>

      <div ref={lotes}>
        <Lotes />
      </div>

      <div ref={contatos}>
        <Contatos />
      </div>
    </div>
  );
}
