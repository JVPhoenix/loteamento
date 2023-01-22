import { React, useState } from "react";
import { Link } from "react-router-dom";
import logoLoteamento from "../../img/logoLoteamento.png";
import openBt from "../../img/menuBtn.png";
import closeBt from "../../img/menuCloseBtn.png";

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
                    src={logoLoteamento} 
                    alt="Logotipo do Loteamento"
                />
                <div
                    className="nav--dropdown"
                    onClick={dropdownEvent}
                >
                    <img 
                        id="nav--menuBtn"
                        className="nav--menuBtn"
                        loading="lazy"
                        src={!dropdown ? openBt : closeBt}
                        alt="Menu Button"
                    />
                    <div 
                    className="nav--infos" 
                    id={dropdown ? "nav--infos" : animation}
                    >
                        <Link to="/" className="link-btn">
                            <h3> Pagina Inicial </h3>
                        </Link>

                        <Link to="/midia" className="link-btn">
                            <h3> Fotos e Videos </h3>
                        </Link>

                    </div>
                </div>  
            </div>
        </nav>
    )
}
