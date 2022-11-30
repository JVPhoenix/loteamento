import React, { useState } from "react"
import logoLoteamento from "../img/logoLoteamento.png"
import openBt from "../img/menuBtn.png"
import closeBt from "../img/menuCloseBtn.png"

export default function Navbar(props){
    const [dropdown, setDropdown] = useState(false)
    const [animation, setAnimation] = useState("none")

    function dropdownEvent(){
        setDropdown(prevState => !prevState)
        setAnimation("outputAnimation")
        if(dropdown){
            setTimeout(() => {
                setAnimation("none")
            }, 800);
        }
    }

    return(
        <nav id="nav">
            <div className="nav--containner">
                <img 
                    id="nav--img" 
                    src={logoLoteamento} 
                    alt="Logotipo do Loteamento" 
                />
                <div 
                    id="nav--dropdown"
                    onClick={dropdownEvent}
                >
                    <img 
                        id="nav--menuBtn"
                        loading="lazy"
                        className="nav--menuBtn"
                        src={!dropdown ? openBt : closeBt}
                        alt="Menu Button"
                    />
                    <div className="nav--infos" id={dropdown ? "nav--infos" : animation}>
                        <div onClick={props.sobreClick}>
                            <h3> Sobre o Loteamento </h3>
                        </div>
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