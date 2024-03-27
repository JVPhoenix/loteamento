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
import { CloseIcon, LoadingIcon } from "@/components/utils/Icons";
import AdminReservationsSelect from "@/components/admin/reservation/AdminReservationsSelect";
import AdminDeleteReservation from "@/components/admin/reservation/AdminDeleteReservation";
import AdminCreateReservation from "@/components/admin/reservation/AdminCreateReservation";
import AdminUpdateReservation from "@/components/admin/reservation/AdminUpdateReservation";

export default function AdminShowReservations() {
  const { searchAdmin } = useAdminsData();
  const { lotesData, responseData, setResponseData } = useLotesData();

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [lotesStatus, setLotesStatus] = useState<LotesStatus | null>(null);
  const [actionType, setActionType] = useState<Methods | null>(null);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
    if (stage === null) {
      setSelectedItem(null);
    }
  };

  const handleLotesStatus = (newState: LotesStatus) => {
    setLotesStatus((state) => (state === newState ? null : newState));
  };

  const handleActionType = (newState: Methods) => {
    setActionType((state) => (state === newState ? null : newState));
  };

  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);
  const [responsesPopup, setResponsesPopup] = useState<StatusResponses | null>(null);
  const [selectRef, setSelectRef] = useState<any>();

  const clearValue = () => {
    setSelectRef(selectRef.clearValue());
  };

  useEffect(() => {
    if (responseData === StatusResponses.Sucess) {
      setSelectedItem(null);
      setActionType(null);
      setResponsesPopup(StatusResponses.Sucess);
      setLotesStatus(null);
      clearValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  const [error, setError] = useState<boolean>(false);

  return (
    <div
      className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white"
      onMouseMove={() => responsesPopup && setResponsesPopup(null)}
    >
      <div className="w-full h-full">
        <Head>
          <title>{searchAdmin?.length !== 0 ? "Editar Reservas" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminEditReservations} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          {/* ACTION TYPE SELECTOR */}
          <div className="flex flex-col m-auto items-center">
            <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
              SELECIONE UMA AÇÃO
            </h1>
            <div className="flex m-auto items-center gap-5">
              <Button
                className={twMerge(
                  "hover:text-green-500 hover:border-green-500",
                  actionType === Methods.POST &&
                    `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold
                       hover:shadow-white shadow-md hover:border-green-500`
                )}
                onClick={() => {
                  handleActionType(Methods.POST);
                  handleLotesStatus(LotesStatus.Free);
                  setResponseData(0);
                }}
              >
                <h1> Fazer uma reserva </h1>
              </Button>
              <Button
                className={twMerge(
                  "hover:text-blue-500 hover:border-blue-500",
                  actionType === Methods.PUT &&
                    `border-blue-500 bg-blue-500 text-black1 hover:text-black1 font-bold
                       hover:shadow-white shadow-md hover:border-blue-500`
                )}
                onClick={() => {
                  handleActionType(Methods.PUT);
                  handleLotesStatus(LotesStatus.Blocked);
                  setResponseData(0);
                }}
              >
                <h1> Editar uma reserva </h1>
              </Button>
              <Button
                className={twMerge(
                  "hover:text-red-500 hover:border-red-500",
                  actionType === Methods.DELETE &&
                    `border-red-500 bg-red-500 text-black1 hover:text-black1
                    font-bold hover:shadow-white shadow-md hover:border-red-500`
                )}
                onClick={() => {
                  handleActionType(Methods.DELETE);
                  handleLotesStatus(LotesStatus.Blocked);
                  setResponseData(0);
                }}
              >
                <h1> Remover uma reserva </h1>
              </Button>
            </div>
            {responsesPopup === StatusResponses.Sucess ? (
              <h1 className="text-green-500">
                A ação foi executada com <b>com sucesso!</b>
              </h1>
            ) : (
              responsesPopup === StatusResponses.Failure && (
                <h1 className="text-green-500">
                  <b>ERRO:</b> Não foi possível executar tal ação!
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
              <div className={twMerge("hidden flex-col items-center", responsesPopup === null && "flex")}>
                <AdminSearchFilters
                  stage={stage}
                  handleStage={handleStage}
                  page={PageSelector.AdminEditReservations}
                  lotesStatus={lotesStatus}
                />
                <AdminReservationsSelect
                  options={lotesData
                    ?.filter((value) => value.situation === lotesStatus && value)
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
                  lotesStatus={lotesStatus}
                  setSelectRef={setSelectRef}
                />
              </div>

              {responsesPopup === StatusResponses.Loading ? (
                <div className="flex items-center justify-center text-white gap-2 text-3xl">
                  <LoadingIcon width={20} className="text-gray-200 animate-spin fill-red-600" />
                  <h1>Carregando, aguarde!</h1>
                </div>
              ) : (
                <>
                  {selectedItem && (
                    <div className="flex flex-col gap-3 items-center p-4">
                      {actionType === Methods.DELETE ? (
                        <AdminDeleteReservation
                          selectedItem={selectedItem}
                          error={error}
                          setError={setError}
                          setStage={setStage}
                          setSelectedItem={setSelectedItem}
                          clearValue={clearValue}
                          setResponsesPopup={setResponsesPopup}
                        />
                      ) : actionType === Methods.POST ? (
                        <AdminCreateReservation
                          selectedItem={selectedItem}
                          error={error}
                          setError={setError}
                          setStage={setStage}
                          setSelectedItem={setSelectedItem}
                          clearValue={clearValue}
                          setResponsesPopup={setResponsesPopup}
                        />
                      ) : (
                        <AdminUpdateReservation
                          selectedItem={selectedItem}
                          error={error}
                          setError={setError}
                          setStage={setStage}
                          setSelectedItem={setSelectedItem}
                          clearValue={clearValue}
                          setResponsesPopup={setResponsesPopup}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <div
              className={twMerge(
                "absolute right-10 top-10",
                "ease-in-out duration-100 active:duration-100 hover:scale-125 active:scale-90"
              )}
              onClick={() => {
                setActionType(null);
                setLotesStatus(null);
                setSelectedItem(null);
                clearValue();
                setStage(null);
                setError(false);
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
