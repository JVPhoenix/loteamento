import React from "react";

export default function Sobre(){
    return(
        <div className="div--sobre">
            <h1> Sobre o Loteamento </h1>
            <div className="div--sobreInfos">
                <div className="div--estrutura">
                    <h3>Estrutura</h3>
                    <p> O Loteamento R. Martins é mais completo e mais estruturado de Cocal,
                        atualmente ele possui:
                    </p>
                    <ul>
                        <li>Localização Privlegiada.</li>
                        <li>Rede Elétrica Completa.</li>
                        <li>Iluminação Pública.</li>
                        <li>Água Encanada.</li>
                        <li>Toda a estrutura pronta para você construir.</li>
                    </ul>
                    <p> Você pode conferir nossa estrutura nas imagens e videos
                        abaixo ou agendando uma visita ao nosso loteamento, basta
                        entrar em contato conosco!
                    </p>
                </div>

                <div className="div--localização">
                    <h3>Localização</h3>
                    <p> O loteamento está ocalizado as margens da PI-309 na saída de Cocal para o Videu, no Bairro Noventa, 
                        em frente ao Parque Aquático Vale Encantado.
                    </p>
                    <p>
                        Nosso escritório de vendas 
                    </p>
                </div>
            </div>
        </div>
    )
}