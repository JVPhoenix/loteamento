import { twMerge } from "tailwind-merge";
import { InstagramIcon, WhatsappIcon, EmailIcon } from "../svg/Icons";
import { PageSelector } from "@/types";

interface ContactsInterface {
  page: string;
}

export default function Contacts(props: ContactsInterface) {
  return (
    <div className="flex flex-col items-center text-center align-middle pb-4 select-none">
      <h1 className="text-white drop-shadow-titles text-xl response:text-3xl font-bold">
        {props.page === PageSelector.ClientSearch ? (
          <>
            ALGUMA INFORMAÇÃO ESTÁ ERRADA? <br /> ENTRE EM CONTATO CONOSCO E NOS INFORME!
          </>
        ) : (
          <> ENTRE EM CONTATO E RESERVE SEU LOTE! </>
        )}
      </h1>
      <div className="flex gap-2 response:gap-5 font-bold text-slate-200 p-6">
        <div
          className={twMerge(
            "flex items-center response:text-xl text-sm",
            "fill-white hover:fill-yellow1",
            "active:scale-90 active:duration-100 hover:text-yellow1",
            "cursor-pointer ease-in-out duration-200 hover:scale-110"
          )}
          onClick={() => window.open("https://wa.me/message/CQB2TCWWX3HIN1", "_blank", "noopener, noreferrer")}
        >
          <WhatsappIcon className="fill-inherit" width={50} />
          <h3>Whatsapp</h3>
        </div>

        <div
          className={twMerge(
            "flex items-center response:text-xl text-sm",
            "fill-white hover:fill-yellow1",
            "active:scale-90 active:duration-100 hover:text-yellow1",
            "cursor-pointer ease-in-out duration-200 hover:scale-110"
          )}
          onClick={() =>
            window.open("https://www.instagram.com/loteamentor.martins/", "_blank", "noopener, noreferrer")
          }
        >
          <InstagramIcon className="fill-inherit" width={50} />
          <h3>Instagram</h3>
        </div>
        <div
          className={twMerge(
            "flex items-center response:text-xl text-sm",
            "stroke-white hover:stroke-yellow1",
            "active:scale-90 active:duration-100 hover:text-yellow1",
            "cursor-pointer ease-in-out duration-200 hover:scale-110"
          )}
          onClick={() => window.open("mailto: loteamentor.martins@gmail.com", "_blank", "noopener, noreferrer")}
        >
          <EmailIcon className="stroke-inherit" width={50} />
          <h3>E-mail</h3>
        </div>
      </div>
    </div>
  );
}
