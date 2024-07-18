import { StatusResponses } from "@/types";
import { twMerge } from "tailwind-merge";

interface StatusPopupInterface {
  responsesPopup: StatusResponses | null;
}

export default function StatusPopup(props: StatusPopupInterface) {
  return (
    <h1
      className={twMerge(
        "text-white p-3",
        props.responsesPopup === StatusResponses.Success && "text-green-500",
        props.responsesPopup === StatusResponses.Failure && "text-red-500"
      )}
    >
      {props.responsesPopup === StatusResponses.Success ? (
        <>
          A ação foi executada com <b>com sucesso!</b>
        </>
      ) : props.responsesPopup === StatusResponses.Failure ? (
        <>
          <b>ERRO:</b> Não foi possível executar tal ação!
        </>
      ) : null}
    </h1>
  );
}
