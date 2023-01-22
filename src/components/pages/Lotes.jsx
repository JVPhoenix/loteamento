import React, { useState } from "react";
import Select from "react-select";
import lotesData from "../../Data/lotesData.ts";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function Lotes(){
    const [open, setOpen] = useState(false)

    const [chosen, setChosen] = useState(lotesData[0])
    function handleChange(event){
        setChosen(event)
    }
    function obterValor(valor, parcela = 1){
        return (valor / parcela).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    return(
        <div className="div--lotes">
            <h1> Lotes Disponíveis </h1>
            <div>
                <img
                    src="https://imgur.com/eYd9c40.png"
                    alt="Mapa dos lotes disponíveis"
                    onClick={() => setOpen(true)}
                />
                <Lightbox
                    slides={[
                        {
                          src: "",
                          alt: "",
                          width: 3160,
                          height: 1733,
                          srcSet: [
                            { src: "https://imgur.com/eYd9c40.png", width: 1580, height: 866 },
                          ]
                        }
                    ]}
                    open={open}
                    close={() => setOpen(false)}
                    plugins={[Zoom]}
                />
            </div>

            <div className="div--lotes-Select">
                <Select 
                    options={lotesData}
                    defaultValue={lotesData[0]}
                    onChange={handleChange}
                />
                <p>Dimensões: {chosen.tamanho}</p>
            </div>

            <div className="div--lotes-Pagamento">
                <div>
                    <h3> Valor A Vista </h3>
                    <span> R$ {obterValor(chosen.valor)} </span>
                </div>

                <div>
                    <h3>Valor A Prazo</h3>
                    <div>
                        <p>Entrada de R$ {(obterValor(chosen.valor, 10))} </p>
                        <p>12x de R$ {(obterValor(chosen.valor, 12))} </p>
                        <p>24x de R$ {(obterValor(chosen.valor, 24))} </p>
                        <p>36x de R$ {(obterValor(chosen.valor, 36))} </p>
                        <p>48x de R$ {(obterValor(chosen.valor, 48))}</p>
                    </div>
                </div>
            </div>
            <p style={{margin: "0px 5px"}}>*Os valores <strong>parcelados</strong> tem reajuste de 
                <strong> 5% ao ano do saldo devedor,</strong> a partir do segundo ano.
            </p>
        </div>
    )
}