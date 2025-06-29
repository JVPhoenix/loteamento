import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import AdminSearchSelect from "@/components/admin/others/AdminSearchSelect";
import ClientPageContent from "@/components/client/ClientPageContent";
import { useClientsData } from "@/context/ClientsDataContext";
import { ClientsDataInterface, FilterSelector, Methods, PageSelector, StatusResponses, UserRoles } from "@/types";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/components/utils/Icons";
import { Button } from "@/components/utils/Button";
import Link from "next/link";
import LoadingStatus from "@/components/utils/LoadingStatus";
import StatusPopup from "@/components/utils/StatusPopup";

interface AdminSearchInterface {
  checkRoles: (role: string) => boolean | undefined;
}

export default function AdminSearch({ checkRoles }: AdminSearchInterface) {
  const { clientsData, clientsResponseData, handleSubmit, setClientsResponseData } = useClientsData();

  // HANDLES useState SECTION
  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [state, setState] = useState<FilterSelector | null>(null);
  const [checkSpecial, setCheckSpecial] = useState<boolean>(false);
  const [stage, setStage] = useState<FilterSelector | null>(null);

  // DATAS useState SECTION
  const [selectRef, setSelectRef] = useState<any>();
  const [actionType, setActionType] = useState<Methods | null>(null);
  const [responsesPopup, setResponsesPopup] = useState<StatusResponses | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [editObs, setEditObs] = useState<string | undefined | null>("");

  // PAYMENT SECTION ------
  const [paymentInsert, setPaymentInsert] = useState<string>("");
  const [paymentIndex, setPaymentIndex] = useState<number | undefined>(undefined);

  // PAYMENT ADD OR EDIT ONE
  const paymentAdd = () => {
    if (selectedClient) {
      if (selectedClient?.paymentList[0] === "") {
        return [paymentInsert.split("-").reverse().join("-")];
      } else {
        return [...selectedClient.paymentList, paymentInsert.split("-").reverse().join("-")];
      }
    } else {
      return [""];
    }
  };

  const paymentEdit = () => {
    if (selectedClient) {
      if (paymentIndex !== undefined) {
        return selectedClient.paymentList.toSpliced(paymentIndex, 1, paymentInsert.split("-").reverse().join("-"));
      } else {
        return selectedClient.paymentList;
      }
    } else {
      return [""];
    }
  };

  // PAYMENT REMOVE ONE
  const paymentRemove = () => {
    if (selectedClient) {
      if (paymentIndex !== undefined) {
        if (selectedClient.paymentList.length === 1) {
          return [""];
        } else {
          return selectedClient.paymentList.toSpliced(paymentIndex, 1);
        }
      } else {
        return selectedClient.paymentList;
      }
    } else {
      return [""];
    }
  };

  // HANDLES SECTION ------
  const handleState = (newState: FilterSelector) => {
    setState((state) => (state === newState ? null : newState));
  };
  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  const handleActionType = (newState: Methods, refId: string, index?: number) => {
    setActionType((state) => (state === newState ? null : newState));
    setResponsesPopup(null);
    newState === Methods.Observation_EDIT && setEditObs(selectedClient?.obs);
    setClientsResponseData(0);
    setTimeout(() => {
      const locationRef = document.getElementById(refId);
      locationRef?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }, 100);
    setPaymentIndex(index);
    newState === Methods.Payment_EDIT &&
      selectedClient &&
      index !== undefined &&
      setPaymentInsert(selectedClient?.paymentList[index].split("-").reverse().join("-"));
  };

  // CLEAR ALL EDITABLE VARIABLES
  const clearValue = () => {
    setSelectRef(selectRef && selectRef.clearValue());
    setSelectedClient(null);
    setEditObs(null);
    setActionType(null);
    setError(false);
    setPaymentInsert("");
    setPaymentIndex(undefined);
  };

  useEffect(() => {
    if (clientsResponseData === StatusResponses.Success) {
      clearValue();
      setResponsesPopup(StatusResponses.Success);
      setStage(null);
      setState(null);
    } else if (clientsResponseData === StatusResponses.Failure) {
      clearValue();
      setResponsesPopup(StatusResponses.Failure);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsResponseData]);

  return (
    <div
      className="relative"
      onMouseMove={() =>
        setTimeout(() => {
          !actionType && responsesPopup && setResponsesPopup(null);
        }, 3000)
      }
    >
      {/* PAGE CONTENT */}
      <div className="flex flex-col m-auto py-6 items-center">
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

        <StatusPopup responsesPopup={responsesPopup} />

        {selectedClient && (
          <ClientPageContent
            data={selectedClient}
            page={PageSelector.AdminSearch}
            handleActionType={handleActionType}
          />
        )}
        {(checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) && !selectedClient ? (
          <Link href={PageSelector.AdminNewClient}>
            <Button className="mt-4 hover:text-green-500 hover:border-green-500">Adicionar um novo Cliente</Button>
          </Link>
        ) : (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) && selectedClient?.status ? (
          <Button
            className="hover:text-red-500 hover:border-red-500"
            onClick={() => handleActionType(Methods.Client_DELETE, "OptionConfirm")}
          >
            Deletar este Cliente
          </Button>
        ) : checkRoles(UserRoles.Admins) && selectedClient && !selectedClient?.status ? (
          <Button
            className="hover:text-green-500 hover:border-green-500"
            onClick={() => handleActionType(Methods.Client_ACTIVATE, "OptionConfirm")}
          >
            Reativar este Cliente
          </Button>
        ) : null}
      </div>

      {/* POPUP EDIT DIV */}
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
            setResponsesPopup(null);
            setEditObs("");
            setError(false);
          }}
        >
          <CloseIcon className="" stroke="white" width={70} />
        </div>

        {responsesPopup === StatusResponses.Loading ? (
          <LoadingStatus />
        ) : (
          <>
            <div className="flex text-center">
              <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
                {actionType === Methods.Observation_DELETE
                  ? "DESEJA MESMO DELETAR A OBSERVAÇÃO?"
                  : actionType === Methods.Observation_EDIT
                  ? "EDITAR A OBSERVAÇÃO"
                  : actionType === Methods.Observation_NEW
                  ? "ADICIONAR UMA OBSERVAÇÃO"
                  : actionType === Methods.Payment_DELETE
                  ? "DESEJA MESMO DELETAR ESTE PAGAMENTO?"
                  : actionType === Methods.Payment_EDIT
                  ? "EDITAR DATA DE PAGAMENTO"
                  : actionType === Methods.Payment_NEW
                  ? "INSIRA A DATA DO PAGAMENTO"
                  : actionType === Methods.Client_DELETE
                  ? "DESEJA MESMO DELETAR ESTE CLIENTE?"
                  : actionType === Methods.Client_ACTIVATE
                  ? "DESEJA MESMO REATIVAR ESTE CLIENTE?"
                  : null}
              </h1>
            </div>
            {actionType !== Methods.Observation_DELETE &&
              actionType !== Methods.Payment_NEW &&
              actionType !== Methods.Payment_DELETE &&
              actionType !== Methods.Payment_EDIT &&
              actionType !== Methods.Client_DELETE &&
              actionType !== Methods.Client_ACTIVATE && (
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
                    id="ObservationCenter"
                  >
                    É necessário digitar um texto no campo da observação!
                  </b>
                </>
              )}
            {actionType !== Methods.Observation_NEW &&
              actionType !== Methods.Observation_DELETE &&
              actionType !== Methods.Observation_EDIT &&
              actionType !== Methods.Payment_DELETE &&
              actionType !== Methods.Client_DELETE &&
              actionType !== Methods.Client_ACTIVATE && (
                <>
                  <input
                    type="date"
                    value={paymentInsert}
                    onChange={(e) => (setPaymentInsert(e.target.value), setError(false))}
                    placeholder="Digite aqui a data"
                    className={twMerge(
                      "placeholder:text-center text-justify rounded-lg text-black",
                      "p-2 border-4 border-white",
                      paymentInsert === "" && error && "border-red-500"
                    )}
                  />
                  <b
                    className={twMerge(
                      "invisible text-red-500 text-sm",
                      paymentInsert === "" && error && "visible animate-pulse"
                    )}
                    id="DateCenter"
                  >
                    É necessário selecionar uma data!
                  </b>
                </>
              )}

            <div className="flex gap-4" id="OptionConfirm">
              <Button
                className="hover:text-green-500 hover:border-green-500"
                onClick={() => {
                  // Condition to: DELETE OBS - SUBMIT
                  if (actionType === Methods.Observation_DELETE) {
                    handleSubmit({ id: selectedClient?.id, obs: null }, Methods.PUT);
                    setResponsesPopup(StatusResponses.Loading);

                    // Condition to: EDIT OBS - SUBMIT
                  } else if (actionType === Methods.Observation_EDIT) {
                    if (editObs !== "") {
                      handleSubmit({ id: selectedClient?.id, obs: editObs }, Methods.PUT);
                    } else {
                      handleSubmit({ id: selectedClient?.id, obs: null }, Methods.PUT);
                    }
                    setResponsesPopup(StatusResponses.Loading);

                    // Condition to: POST OBS - SUBMIT
                  } else if (actionType === Methods.Observation_NEW) {
                    if (editObs !== null) {
                      handleSubmit({ id: selectedClient?.id, obs: editObs }, Methods.PUT);
                      setResponsesPopup(StatusResponses.Loading);
                    } else {
                      setError(true);
                    }

                    // Condition to: DELETE PAY - SUBMIT
                  } else if (actionType === Methods.Payment_DELETE) {
                    handleSubmit({ id: selectedClient?.id, paymentList: paymentRemove() }, Methods.PUT);
                    setResponsesPopup(StatusResponses.Loading);

                    // Condition to: EDIT PAY - SUBMIT
                  } else if (actionType === Methods.Payment_EDIT) {
                    handleSubmit({ id: selectedClient?.id, paymentList: paymentEdit() }, Methods.PUT);
                    setResponsesPopup(StatusResponses.Loading);

                    // Condition to: POST PAY - SUBMIT
                  } else if (actionType === Methods.Payment_NEW) {
                    if (paymentInsert !== "") {
                      handleSubmit(
                        {
                          id: selectedClient?.id,
                          paymentList: paymentAdd(),
                        },
                        Methods.PUT
                      );
                      setResponsesPopup(StatusResponses.Loading);
                    } else {
                      setError(true);
                    }

                    // Condition To: DELETE A CLIENT - SUBMIT
                  } else if (actionType === Methods.Client_DELETE) {
                    handleSubmit({ id: selectedClient?.id, status: false }, Methods.PUT);
                    setResponsesPopup(StatusResponses.Loading);

                    // Condition to: Any of above works, sends a failure message.
                  } else if (actionType === Methods.Client_ACTIVATE) {
                    handleSubmit({ id: selectedClient?.id, status: true }, Methods.PUT);
                    setResponsesPopup(StatusResponses.Loading);
                  } else {
                    setResponsesPopup(StatusResponses.Failure);
                  }
                }}
              >
                <h1> Confirmar </h1>
              </Button>
              <Button
                className="hover:text-red-500 hover:border-red-500"
                onClick={() => {
                  setActionType(null);
                  setResponsesPopup(null);
                  setEditObs("");
                  setPaymentInsert("");
                  setError(false);
                }}
              >
                <h1> Cancelar </h1>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
