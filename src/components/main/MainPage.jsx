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
                <div>
                    <Sobre />
                </div>

                <div>
                    <Lotes />
                </div>

                <div>
                    <Contatos />
                </div>
            
                <Footer />
            </div>
         </>
    )
}