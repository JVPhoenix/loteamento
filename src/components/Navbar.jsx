import React from "react"
import logoLoteamento from "../img/logoLoteamento.png"

export default function Navbar(props){
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
                        <div onClick={props.fotosClick}>
                            <h3> Fotos e Videos </h3>
                        </div>

                        <div onClick={props.lotesClick}>
                            <h3> Lotes Disponíveis </h3>
                        </div>

                        <div onClick={props.contatoClick}>
                            <h3> Contato </h3>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}