import React, { useState } from "react";
import Select from "react-select";
import lotesData from "../Data/lotesData.ts";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export default function Lotes(){
    const [chosen, setChosen] = useState(lotesData[0])
    function handleChange(event){
        setChosen(event)
    }
    function obterValor(valor, parcela = 1){
        return (valor / parcela).toLocaleString('pt-br', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    const [open, setOpen] = useState(false)

    return(
        <div className="div--lotes">
            <h1> Lotes Disponíveis </h1>
            <div className="div--mapas">
                <img 
                    src="https://i.imgur.com/Lu4gLkx.png"
                    alt="Mapa dos lotes disponíveis"
                    onClick={() => setOpen(true)}/>
                <Lightbox 
                    slides={[
                        {
                          src: "i.imgur.com/",
                          alt: "image 1",
                          width: 3840,
                          height: 2560,
                          srcSet: [
                            { src: "https://i.imgur.com/Lu4gLkx.png", width: 1920, height: 1080 },
                          ]
                        }
                    ]}
                    open={open}
                    close={() => setOpen(false)}
                    plugins={[Zoom]}
                />
            </div>

            <div className="div--select">
                <Select 
                    options={lotesData}
                    defaultValue={lotesData[0]}
                    onChange={handleChange}
                />
            </div>

            <div className="div--pagamento">
                <div>
                    <p className="bold"> Valor A Vista </p>
                    <span> R$ {obterValor(chosen.valor)} </span>
                </div>

                <div>
                    <p className="bold">Valor Parcelado </p>
                    <div>
                        <p>Entrada de R$ {(obterValor(chosen.valor, 10))} </p>
                        <p>12x de R$ {(obterValor(chosen.valor, 12))} </p>
                        <p>24x de R$ {(obterValor(chosen.valor, 24))} </p>
                        <p>36x de R$ {(obterValor(chosen.valor, 36))} </p>
                        <p>48x de R$ {(obterValor(chosen.valor, 48))}</p>
                    </div>
                </div>
            </div>
            <p>**Os valores <strong>parcelados</strong> tem reajuste de 
                <strong> 5% ao ano do saldo devedor.</strong>
            </p>
        </div>
    )
}