import { Button } from "@/components/utils/Button";
import { useAdminsData } from "@/context/AdminsDataContext";
import { useLotesData } from "@/context/LotesDataContext";
import { FilterSelector, LotesDataInterface, Methods, StatusResponses } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

interface AdminCreateReservationInterface {
  selectedItem: LotesDataInterface;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<FilterSelector | null>>;
  setSelectedItem: Dispatch<SetStateAction<LotesDataInterface | null>>;
  clearValue: () => void;
  setResponsesPopup: Dispatch<SetStateAction<StatusResponses | null>>;
}

export default function AdminCreateReservation(props: AdminCreateReservationInterface) {
  const searchAdmin = useAdminsData()
    .searchAdmin?.map((value) => value.name)
    .toString();
  const { handleSubmit } = useLotesData();

  const [reservedName, setReservedName] = useState<string>("");
  const [reservedContact, setReservedContact] = useState<string | null>("");

  return (
    <>
      <h1 className="text-green-600 text-xl response:text-2xl font-bold ">ADICIONE OS DADOS DA RESERVA</h1>
      <div className="flex flex-col leading-tight items-center gap-1">
        <input
          type="text"
          onChange={(e) => setReservedName(e.target.value)}
          placeholder="Nome do interessado"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            reservedName === "" && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            reservedName === "" && props.error && "visible animate-pulse"
          )}
        >
          Insira o nome do interessado!
        </b>
      </div>
      <div className="flex flex-col leading-tight items-center gap-1">
        <input
          type="text"
          onChange={(e) => setReservedContact(e.target.value)}
          placeholder="Contato do interessado"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100"
          )}
        />
      </div>

      <h1 className="text-gray1 text-xl response:text-2xl font-normal select-none m-2">
        Deseja adicionar esta reserva?
      </h1>

      <div className="flex gap-5">
        <Button
          className={twMerge("hover:text-green-500 hover:border-green-500")}
          onClick={() => {
            if (reservedName !== "") {
              handleSubmit(
                {
                  id: props.selectedItem.id,
                  situation: "bloqueado",
                  reservedBy: searchAdmin,
                  reservedFor: reservedName,
                  reservedForContact: reservedContact !== "" ? reservedContact : null,
                  reservedDate: new Date(),
                },
                Methods.PUT
              );
              setReservedName("");
              setReservedContact(null);
              props.setError(false);
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
