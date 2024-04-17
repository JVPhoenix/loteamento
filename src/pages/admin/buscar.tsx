import ErrorPage from "@/components/utils/ErrorPage";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import AdminSearchSelect from "@/components/admin/AdminSearchSelect";
import ClientPageContent from "@/components/client/ClientPageContent";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useClientsData } from "@/context/ClientsDataContext";
import { ClientsDataInterface, FilterSelector, Methods, PageSelector, StatusResponses } from "@/types";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { twMerge } from "tailwind-merge";
import { CloseIcon, LoadingIcon } from "@/components/utils/Icons";
import { Button } from "@/components/utils/Button";

export default function Search() {
  const { user, isLoading } = useUser();
  const { clientsData, clientsResponseData, handleSubmit, setClientsResponseData } = useClientsData();

  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [state, setState] = useState<FilterSelector | null>(null);
  const [checkSpecial, setCheckSpecial] = useState<boolean>(false);
  const [stage, setStage] = useState<FilterSelector | null>(null);

  const [selectRef, setSelectRef] = useState<any>();
  const [actionType, setActionType] = useState<Methods | null>(null);
  const [responsesPopup, setResponsesPopup] = useState<StatusResponses | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [editObs, setEditObs] = useState<string | undefined | null>("");

  const handleState = (newState: FilterSelector) => {
    setState((state) => (state === newState ? null : newState));
  };
  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  const handleActionType = (newState: Methods) => {
    setActionType((state) => (state === newState ? null : newState));
    setEditObs(selectedClient?.obs);
    setClientsResponseData(0);
  };

  const clearValue = () => {
    setSelectRef(selectRef.clearValue());
  };

  useEffect(() => {
    if (clientsResponseData === StatusResponses.Sucess) {
      clearValue();
      setSelectedClient(null);
      setActionType(null);
      setResponsesPopup(StatusResponses.Sucess);
      setEditObs(null);
      setError(false);
      setStage(null);
      setState(null);
      setError(false);
    } else if (clientsResponseData === StatusResponses.Failure) {
      setSelectedClient(null);
      setActionType(null);
      setResponsesPopup(StatusResponses.Failure);
      setError(false);
      clearValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsResponseData]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white relative">
      <div className="w-full h-full">
        <Header page={PageSelector.AdminSearch} />
      </div>
      {!isLoading && (
        <>
          {user ? (
            <>
              <div
                className="flex flex-col m-auto py-6 items-center"
                onMouseMove={() =>
                  setTimeout(() => {
                    responsesPopup && setResponsesPopup(null);
                  }, 10000)
                }
              >
                <div className="flex flex-col items-center">
                  <AdminSearchFilters
                    state={state}
                    handleState={handleState}
                    checkSpecial={checkSpecial}
                    setCheckSpecial={setCheckSpecial}
                    stage={stage}
                    handleStage={handleStage}
                    page={PageSelector.AdminSearch}
                  />
                  <AdminSearchSelect
                    setSelectRef={setSelectRef}
                    options={clientsData}
                    placeholder="Digite o Nome do Cliente ou Quadra e Lote"
                    setSelectedClient={setSelectedClient}
                    state={state}
                    special={checkSpecial}
                    stage={stage}
                    page={PageSelector.AdminSearch}
                  />
                </div>

                {responsesPopup === StatusResponses.Sucess ? (
                  <h1 className="text-green-500 p-3">
                    A ação foi executada com <b>com sucesso!</b>
                  </h1>
                ) : (
                  responsesPopup === StatusResponses.Failure && (
                    <h1 className="text-red-500 p-3">
                      <b>ERRO:</b> Não foi possível executar tal ação!
                    </h1>
                  )
                )}

                {selectedClient && (
                  <ClientPageContent
                    data={selectedClient}
                    page={PageSelector.AdminSearch}
                    handleActionType={handleActionType}
                  />
                )}
              </div>
              <div
                className={twMerge(
                  "absolute hidden flex-col gap-5 items-center justify-center w-full h-full",
                  "bg-black bg-opacity-90 z-[99]",
                  actionType !== null && "flex"
                )}
              >
                <div
                  className={twMerge(
                    "absolute right-10 top-10",
                    "ease-in-out duration-100 active:duration-100 hover:scale-125 active:scale-90"
                  )}
                  onClick={() => {
                    setActionType(null);
                    setEditObs("");
                    // setError(false);
                  }}
                >
                  <CloseIcon className="" stroke="white" width={70} />
                </div>

                {responsesPopup === StatusResponses.Loading ? (
                  <div className="flex items-center justify-center text-white gap-2 text-3xl">
                    <LoadingIcon width={20} className="text-gray-200 animate-spin fill-red-600" />
                    <h1>Carregando, aguarde!</h1>
                  </div>
                ) : (
                  <>
                    <div className="flex text-center">
                      <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
                        {actionType === Methods.DELETE
                          ? "DESEJA MESMO DELETAR A OBSERVAÇÃO?"
                          : actionType === Methods.PUT
                          ? "EDITAR A OBSERVAÇÃO"
                          : actionType === Methods.POST
                          ? "ADICIONAR UMA OBSERVAÇÃO"
                          : null}
                      </h1>
                    </div>
                    {actionType !== Methods.DELETE && (
                      <>
                        <textarea
                          value={editObs ? editObs : ""}
                          onChange={(e) => setEditObs(e.target.value)}
                          placeholder="Digite aqui a observação"
                          className={twMerge(
                            "placeholder:text-center response:w-[550px] response:h-36 w-64 h-24 text-justify rounded-lg text-black",
                            "p-2 border-4 border-white",
                            editObs === "" && error && "border-red-500"
                          )}
                        />
                        <b
                          className={twMerge(
                            "invisible text-red-500 text-sm",
                            editObs === "" && error && "visible animate-pulse"
                          )}
                        >
                          É necessário digitar um texto no campo da observação!
                        </b>
                      </>
                    )}

                    <div className="flex gap-4">
                      <Button
                        className={twMerge("hover:text-green-500 hover:border-green-500")}
                        onClick={() => {
                          if (actionType === Methods.DELETE) {
                            handleSubmit({ id: selectedClient?.id, obs: null }, Methods.PUT);
                            setResponsesPopup(StatusResponses.Loading);
                          } else if (actionType === Methods.PUT) {
                            if (editObs !== "") {
                              handleSubmit({ id: selectedClient?.id, obs: editObs }, Methods.PUT);
                            } else {
                              handleSubmit({ id: selectedClient?.id, obs: null }, Methods.PUT);
                            }
                            setResponsesPopup(StatusResponses.Loading);
                          } else if (actionType === Methods.POST) {
                            if (editObs !== null) {
                              handleSubmit({ id: selectedClient?.id, obs: editObs }, Methods.PUT);
                              setResponsesPopup(StatusResponses.Loading);
                            } else {
                              setError(true);
                            }
                          } else {
                            setResponsesPopup(StatusResponses.Failure);
                          }
                        }}
                      >
                        <h1> Confirmar </h1>
                      </Button>
                      <Button
                        className={twMerge("hover:text-red-500 hover:border-red-500")}
                        onClick={() => {
                          setActionType(null);
                          setError(false);
                        }}
                      >
                        <h1> Cancelar </h1>
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <Footer />
            </>
          ) : (
            <ErrorPage page={PageSelector.AdminSearch} />
          )}
        </>
      )}
    </div>
  );
}
