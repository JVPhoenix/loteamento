import { Button } from "@/components/utils/Button";
import { useLotesData } from "@/context/LotesDataContext";
import { FilterSelector, LotesDataInterface, Methods, StatusResponses, UserRoles } from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

interface AdminDeleteReservationInterface {
  selectedItem: LotesDataInterface;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<FilterSelector | null>>;
  setSelectedItem: Dispatch<SetStateAction<LotesDataInterface | null>>;
  clearValue: () => void;
  setResponsesPopup: Dispatch<SetStateAction<StatusResponses | null>>;
}

export default function AdminDeleteReservation(props: AdminDeleteReservationInterface) {
  const { user } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  const { handleSubmit } = useLotesData();
  const [purchased, setPurchased] = useState<boolean | null>(null);

  const handlePurchased = (newState: boolean) => {
    setPurchased((state) => (state === newState ? null : newState));
  };

  return (
    <>
      <h1 className="text-green-600 text-xl response:text-2xl font-bold">DADOS DA RESERVA</h1>
      <div className="flex leading-tight items-center gap-1">
        <h1>
          <b>Reservado por: </b>
          {props.selectedItem?.reservedBy}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1">
        <h1>
          <b>Nome do Interessado: </b>
          {props.selectedItem?.reservedFor}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1">
        <h1>
          <b>Contato do Interessado: </b>
          {props.selectedItem.reservedForContact ? props.selectedItem.reservedForContact : "Não Informado"}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1 pb-4">
        <h1>
          <b>Data da Reserva: </b>
          {props.selectedItem.reservedDate
            ? new Date(props.selectedItem.reservedDate).toLocaleString("default", {
                month: "long",
                year: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Não informado"}
        </h1>
      </div>

      {(checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) && (
        <div className="flex flex-col leading-tight m-auto items-center gap-1 mb-3">
          <h1 className="text-green-600 text-xl response:text-2xl font-bold"> O LOTE FOI VENDIDO? </h1>
          <div className="flex gap-5 items-center">
            <Button
              className={twMerge(
                "hover:text-green-500 hover:border-green-500",
                purchased &&
                  `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold 
                hover:shadow-white shadow-md hover:border-green-500`
              )}
              onClick={() => {
                handlePurchased(true);
                props.setError(false);
              }}
            >
              <h1> Sim </h1>
            </Button>
            <Button
              className={twMerge(
                "hover:text-red-500 hover:border-red-500",
                purchased === false &&
                  `border-red-500 bg-red-500 text-black1 hover:text-black1
                  font-bold hover:shadow-white shadow-md hover:border-red-500`
              )}
              onClick={() => {
                handlePurchased(false);
                props.setError(false);
              }}
            >
              <h1> Não </h1>
            </Button>
          </div>
          <h1 className={twMerge("invisible text-red-500 text-sm", props.error && "visible animate-pulse")}>
            Selecione uma destas opções!
          </h1>
        </div>
      )}

      <h1 className="text-gray1 text-xl response:text-2xl font-normal select-none">
        Deseja mesmo remover esta reserva?
      </h1>

      <div className="flex gap-5">
        <Button
          className={twMerge("hover:text-green-500 hover:border-green-500")}
          onClick={() => {
            if (purchased !== null && (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee))) {
              if (purchased === true) {
                handleSubmit(
                  {
                    id: props.selectedItem?.id,
                    situation: "vendido",
                    reservedBy: user?.name?.split(" ")[0],
                  },
                  Methods.PUT
                );
                setPurchased(null);
                props.setResponsesPopup(StatusResponses.Loading);
              } else {
                handleSubmit(
                  { id: props.selectedItem?.id, situation: "livre", reservedFor: "", reservedForContact: "" },
                  Methods.PUT
                );
                setPurchased(null);
                props.setStage(null);
                props.setResponsesPopup(StatusResponses.Loading);
              }
            } else if (checkRoles(UserRoles.Sales) && !checkRoles(UserRoles.Admins)) {
              handleSubmit(
                { id: props.selectedItem?.id, situation: "livre", reservedFor: "", reservedForContact: "" },
                Methods.PUT
              );
              setPurchased(null);
              props.setStage(null);
              props.setResponsesPopup(StatusResponses.Loading);
            } else {
              props.setError(true);
            }
          }}
        >
          <h1> Confirmar </h1>
        </Button>
        <Button
          className={twMerge("hover:text-red-500 hover:border-red-500")}
          onClick={() => {
            props.setSelectedItem(null);
            props.clearValue();
            props.setError(false);
          }}
        >
          <h1> Cancelar </h1>
        </Button>
      </div>
    </>
  );
}
