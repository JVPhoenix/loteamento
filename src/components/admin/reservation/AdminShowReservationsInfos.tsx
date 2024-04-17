import { LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import ProductsPrices from "../../products/ProductsPrices";
import { MultiValue } from "react-select";

interface ReservationsInfosInterface {
  selectedItem: MultiValue<LotesDataInterface> | null;
  actionType?: LotesStatus;
}

export default function AdminReservationsInfos({ selectedItem }: ReservationsInfosInterface) {
  return (
    <>
      <div className="flex flex-col max-w-md gap-3 items-center p-4">
        <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS DA RESERVA</h1>
        <div className="flex leading-tight items-center gap-1">
          <h1>
            <b>Reservado por: </b>
            {selectedItem
              ?.map((mapValue) => {
                return mapValue.reservedBy ? mapValue.reservedBy : "Não Informado";
              })
              .filter((value, index, array) => {
                return array.indexOf(value) === index;
              })
              .join(", ")}
          </h1>
        </div>
        <div className="flex leading-tight items-center gap-1">
          <h1>
            <b>Nome do Interessado: </b>
            {selectedItem
              ?.map((value) => {
                return value.reservedFor ? value.reservedFor : "Não Informado";
              })
              .filter((value, index, array) => {
                return array.indexOf(value) === index;
              })
              .join(", ")}
          </h1>
        </div>
        <div className="flex leading-tight items-center gap-1">
          <h1>
            <b>Contato do Cliente: </b>
            {selectedItem
              ?.map((value) => {
                return value.reservedForContact ? value.reservedForContact : "Não Informado";
              })
              .filter((value, index, array) => {
                return array.indexOf(value) === index;
              })
              .join(", ")}
          </h1>
        </div>
        <div className="flex leading-tight items-center gap-1">
          <h1>
            <b>Data da Reserva: </b>
            {selectedItem
              ?.map((value) => {
                return value.reservedDate
                  ? new Date(value.reservedDate).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Não Informado";
              })
              .filter((value, index, array) => {
                return array.indexOf(value) === index;
              })
              .join(", ")}
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center p-4">
        <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS DO LOTE</h1>
        <h1 className="font-bold">
          Localizado na{" "}
          {selectedItem?.length
            ? selectedItem
                .map((value) => value.phase + "ª Etapa")
                .filter((value, index, array) => {
                  return array.indexOf(value) === index;
                })
                .join(" e ")
            : "X Etapa"}
        </h1>
        <ProductsPrices
          selectedItem={selectedItem}
          phase={selectedItem?.map((value) => value.phase).includes(2) ? 2 : 1}
          page={PageSelector.AdminShowReservations}
        />
      </div>
    </>
  );
}
