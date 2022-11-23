import React, { useState } from "react";
import Select from "react-select";
import lotesData from "../Data/lotesData.ts";

export default function Lotes(){
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
        </div>
    )
}