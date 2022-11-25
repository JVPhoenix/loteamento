import React from "react"

export default function Footer(){
    return(
        <footer>
            <div>
            <p>Developed and designed 
                by <span onClick={() => window.open(
                'https://jvphoenixportfolio.netlify.app/',
                '_blank',
                'noopener, noreferrer'
                )
                }><u style={{cursor: "pointer"}}>jvphoenix </u></span>
            </p>
            <p>Todos os Direitos Reservados ® Loteamento R. Martins 2022</p>
            </div>
        </footer>
    )
}