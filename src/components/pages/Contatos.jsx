import React from "react";
import whatsappLogo from "../../img/whatsapp-icon.png"
import instagramLogo from "../../img/instagram-icon.png"
import gmailLogo from "../../img/gmail-icon.png"

export default function Contacts(){
    return(
        <div className="div--contatos">
            <h1> Entre em Contato e Reserve seu Lote </h1>
            <div className="div--contatos-Infos">
                <div 
                    onClick={() => window.open(
                        'https://wa.me/message/CQB2TCWWX3HIN1',
                        '_blank',
                        'noopener, noreferrer'
                        )
                    }
                >
                    <img src={whatsappLogo} alt="logo whatsapp" />
                    <p> Whatsapp </p>
                </div>

                <div
                    onClick={() => window.open(
                        'https://www.instagram.com/loteamentor.martins/',
                        '_blank',
                        'noopener, noreferrer'
                        )
                    }
                >
                    <img src={instagramLogo} alt="logo instagram" />
                    <p> Instagram </p>
                </div>
                <div
                    onClick={() => window.open(
                        'mailto: loteamentor.martins@gmail.com',
                        '_blank',
                        'noopener, noreferrer'
                        )
                    }
                >
                    <img src={gmailLogo} alt="logo e-mail" />
                    <p> E-mail </p>
                </div>
            </div>
        </div>
    )
}