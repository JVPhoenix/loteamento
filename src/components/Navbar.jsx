import React from "react"
import logoLoteamento from "../img/logoLoteamento.png"

export default function Navbar(){
    return(
        <nav>
            <div className="nav--containner">
                <img src={logoLoteamento} alt="Logotipo do Loteamento" />
                <div 
                    className="nav--dropdown"
                >
                    <div 
                        className="nav--infos"
                        >
                        <div>
                            <h3> Fotos e Videos </h3>
                        </div>

                        <div>
                            <h3> Lotes Disponíveis </h3>
                        </div>

                        <div>
                            <h3> Contato </h3>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}