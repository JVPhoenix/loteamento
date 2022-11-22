import React from "react";
import Select from "react-select";
import lotesData from "../Data/lotesData.ts";

export default function Lotes(){
    return(
        <div className="div--lotes">
            <h1> Lotes Disponíveis </h1>

            <div className="div--select">
                <Select options={lotesData}/>
            </div>

            <div className="div--pagamento">
                <div>
                    <p className="bold"> Valor a vista </p>
                    <span> X R$ </span>
                </div>

                <div>
                    <p className="bold">Parcelado </p>
                    <div>
                        <p>Entrada de R$</p>
                        <p>12x de R$</p>
                        <p>24x de R$</p>
                        <p>36x de R$</p>
                        <p>48x de R$</p>
                    </div>
                </div>

            </div>
        </div>
    )
}