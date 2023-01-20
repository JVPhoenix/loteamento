import React from "react";
import Navbar from "./Navbar";
import Sobre from "../pages/Sobre";
import Lotes from "../pages/Lotes";
import Contatos from "../pages/Contatos";
import Footer from "../pages/Footer";

export default function MainPage() {
    return(
        <>
            <Navbar />
            <div className="main--body">
                <div id="s-Sobre">
                    <Sobre />
                </div>

                <div id="s-Lotes">
                    <Lotes />
                </div>

                <div id="s-Contatos">
                    <Contatos />
                </div>
            
                <Footer />
            </div>
         </>
    )
}

    //   <Navbar
    //     sobreClick = {() => scroll("s-Sobre")}
    //     fotosClick = {() => scroll("s-Imagens")}
    //     lotesClick = {() => scroll("s-Lotes")}
    //     contatoClick = {() => document.getElementById("s-Contatos").scrollIntoView(true)}
    //   />