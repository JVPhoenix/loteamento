import ErrorPage from "@/components/utils/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { FilterSelector, LotesDataInterface, LotesStatus, Methods, PageSelector, StatusResponses } from "@/types";
import Head from "next/head";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import { useEffect, useState } from "react";
import { useLotesData } from "@/context/LotesDataContext";
import { Button } from "@/components/utils/Button";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/components/utils/Icons";
import AdminReservationsSelect from "@/components/admin/AdminReservationsSelect";
import { clear } from "console";

export default function AdminShowReservations() {
  const { searchAdmin } = useAdminsData();
  const { lotesData, handleSubmit, responseData, setResponseData } = useLotesData();

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [actionType, setActionType] = useState<LotesStatus | null>(null);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
    if (stage === null) {
      setSelectedItem(null);
    }
  };

  const handleActionType = (newState: LotesStatus) => {
    setActionType((state) => (state === newState ? null : newState));
  };

  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);
  const [responsesPopup, setInfoMessage] = useState<StatusResponses | null>(null);

  const [selectRef, setSelectRef] = useState<any>();

  const clearValue = () => {
    setSelectRef(selectRef.clearValue());
  };

  useEffect(() => {
    if (responseData === StatusResponses.Sucess) {
      setSelectedItem(null);
      setActionType(null);
      setInfoMessage(StatusResponses.Sucess);
      clearValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>{searchAdmin?.length !== 0 ? "Editar Reservas" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminEditReservations} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto items-center">
            <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
              SELECIONE UMA AÇÃO
            </h1>
            <div className="flex m-auto items-center gap-5">
              <Button
                className={twMerge(
                  "hover:text-green-500 hover:border-green-500",
                  actionType === LotesStatus.Free &&
                    `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold
                       hover:shadow-white shadow-md hover:border-green-500`
                )}
                onClick={() => {
                  handleActionType(LotesStatus.Free);
                  setResponseData(0);
                }}
              >
                <h1> Fazer uma reserva </h1>
              </Button>
              <Button
                className={twMerge(
                  "hover:text-red-500 hover:border-red-500",
                  actionType === LotesStatus.Blocked &&
                    `border-red-500 bg-red-500 text-black1 hover:text-black1
                    font-bold hover:shadow-white shadow-md hover:border-red-500`
                )}
                onClick={() => {
                  handleActionType(LotesStatus.Blocked);
                  setResponseData(0);
                }}
              >
                <h1> Remover uma reserva </h1>
              </Button>
            </div>
            {responsesPopup === StatusResponses.Sucess ? (
              <h1 className="text-green-500">
                A Reserva foi <b>DELETADA</b> com sucesso!
              </h1>
            ) : (
              responsesPopup === StatusResponses.Failure && (
                <h1 className="text-green-500">
                  <b>ERRO:</b> Não foi possível remover a reserva!
                </h1>
              )
            )}
          </div>

          <div
            className={twMerge(
              "absolute hidden flex-col items-center justify-center w-full h-full bg-black bg-opacity-90 z-50",
              actionType !== null && "flex"
            )}
          >
            <div className="flex flex-col items-center">
              <AdminSearchFilters
                stage={stage}
                handleStage={handleStage}
                page={PageSelector.AdminEditReservations}
                actionType={actionType}
              />
              <AdminReservationsSelect
                options={lotesData
                  ?.filter((value) => value.situation === actionType && value)
                  .filter((value) => {
                    if (stage !== null) {
                      if (stage === value.phase) {
                        return value;
                      }
                    } else {
                      return value;
                    }
                  })}
                placeholder={"Digite o Lote ou o Nome do Cliente"}
                onChange={(selection: LotesDataInterface | null) => setSelectedItem(selection)}
                loteStatus={actionType}
                setSelectRef={setSelectRef}
              />

              {selectedItem && (
                <div className="flex flex-col gap-3 items-center p-4">
                  {actionType === LotesStatus.Blocked ? (
                    <>
                      <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS DA RESERVA</h1>
                      <div className="flex leading-tight items-center gap-1">
                        <h1>
                          <b>Reservado por: </b>
                          {selectedItem.reservedBy}
                        </h1>
                      </div>
                      <div className="flex leading-tight items-center gap-1">
                        <h1>
                          <b>Nome do Interessado: </b>
                          {selectedItem.reservedFor}
                        </h1>
                      </div>
                      <div className="flex leading-tight items-center gap-1">
                        <h1>
                          <b>Data da Reserva: </b>
                          {selectedItem.reservedDate
                            ? selectedItem.reservedDate.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                              })
                            : "Não informado"}
                        </h1>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-green-600 text-xl response:text-2xl font-bold ">
                        ADICIONE OS DADOS DA RESERVA
                      </h1>
                      <div className="flex flex-col leading-tight items-center gap-1">
                        <input
                          type="text"
                          // onChange={(e) => handleCurrencyMask(e.target.value)}
                          placeholder="Nome do interessado"
                          className={twMerge(
                            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
                            "hover:scale-110 focus:scale-110 ease-in-out duration-100"
                            // checkEntrance && "border-red-500"
                          )}
                        />
                      </div>
                      <div className="flex flex-col leading-tight items-center gap-1">
                        <input
                          type="text"
                          // onChange={(e) => handleCurrencyMask(e.target.value)}
                          placeholder="Contato do interessado"
                          className={twMerge(
                            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
                            "hover:scale-110 focus:scale-110 ease-in-out duration-100"
                            // checkEntrance && "border-red-500"
                          )}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex flex-col items-center">
                    <h1 className="text-gray1 text-xl response:text-2xl font-normal select-none m-2">
                      {actionType === LotesStatus.Blocked
                        ? "Deseja mesmo remover esta reserva?"
                        : "Deseja adicionar esta reserva?"}
                    </h1>
                    <div className="flex gap-5">
                      <Button
                        className={twMerge("hover:text-green-500 hover:border-green-500")}
                        onClick={() => {
                          if (actionType === LotesStatus.Blocked) {
                            handleSubmit(selectedItem, Methods.DELETE);
                          } else if (actionType === LotesStatus.Free) {
                            // handleSubmit(selectedItem, Methods.PUT)
                          } else {
                            return null;
                          }
                        }}
                      >
                        <h1> Confirmar </h1>
                      </Button>
                      <Button
                        className={twMerge("hover:text-red-500 hover:border-red-500")}
                        onClick={() => {
                          setSelectedItem(null);
                          clearValue();
                        }}
                      >
                        <h1> Cancelar </h1>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={twMerge(
                "absolute right-10 top-10",
                "ease-in-out duration-100 active:duration-100 hover:scale-125 active:scale-90"
              )}
              onClick={() => {
                setActionType(null);
                setSelectedItem(null);
                clearValue();
              }}
            >
              <CloseIcon className="" stroke="white" width={70} />
            </div>
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminReadjustSimulate} />
      ) : null}
    </div>
  );
}
