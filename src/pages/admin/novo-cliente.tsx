import AdminNewClientInfos from "@/components/admin/AdminNewClientInfos";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import AdminReservationsSelect from "@/components/admin/reservation/AdminReservationsSelect";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { Button } from "@/components/utils/Button";
import ErrorPage from "@/components/utils/ErrorPage";
import { CloseIcon } from "@/components/utils/Icons";
import LoadingStatus from "@/components/utils/LoadingStatus";
import StatusPopup from "@/components/utils/StatusPopup";
import { useClientsData } from "@/context/ClientsDataContext";
import { useLotesData } from "@/context/LotesDataContext";
import {
  FilterSelector,
  LotesDataInterface,
  LotesStatus,
  Methods,
  PageSelector,
  StatusResponses,
  UserRoles,
} from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function NewClient() {
  // USER CONTEXT SECTION
  const { clientsResponseData, handleSubmit } = useClientsData();
  const { user, isLoading } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  // LOTES CONTEXT SECTION
  const lotesData = useLotesData().lotesData;

  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);
  const [lotesStatus, setLotesStatus] = useState<LotesStatus | null>(null);

  const [selectRef, setSelectRef] = useState<any>();

  // STAGE SELECT SECTION
  const [stage, setStage] = useState<FilterSelector | null>(null);
  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
    if (stage === null) {
      setSelectedItem(null);
    }
  };

  // USER INFO SECTION
  const [name, setName] = useState<string | undefined>("");
  const [cpf, setCpf] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [address, setAddress] = useState<string>("");
  const [plan, setPlan] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");

  const handleStartDate = () => {
    const date = new Date(startDate);
    const finalDate = new Date(date.setMonth(date.getMonth() - 1, date.getDate() + 1));
    return finalDate.toLocaleString("es-cl", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const [entrance, setEntrance] = useState<string>("");
  const [standardEntrance, setStandardEntrance] = useState<boolean>(true);
  const [contractNumber, setContractNumber] = useState<string>("");

  const [standard, setStandard] = useState<boolean>(true);
  const [obs, setObs] = useState<string | null>(null);
  const [digitalContract, setDigitalContract] = useState<string>("");

  const [allDataInserted, setAllDataInserted] = useState<boolean>(false);

  useEffect(() => {
    name !== "" ||
    cpf !== "" ||
    birth !== "" ||
    phone !== "" ||
    address !== "" ||
    plan !== 0 ||
    startDate !== "" ||
    selectedItem !== null ||
    (!standardEntrance ? entrance !== "" : false)
      ? setAnyDataInserted(true)
      : setAnyDataInserted(false);

    name !== "" &&
    cpf !== "" &&
    birth !== "" &&
    phone !== "" &&
    address !== "" &&
    plan !== 0 &&
    startDate !== "" &&
    selectedItem !== null &&
    (!standardEntrance ? entrance !== "" : true)
      ? setAllDataInserted(true)
      : setAllDataInserted(false);
  }, [name, cpf, birth, phone, address, plan, startDate, selectedItem, standardEntrance, entrance, digitalContract]);

  // EXTRAS
  const [error, setError] = useState<boolean>(false);
  const [responsesPopup, setResponsesPopup] = useState<StatusResponses | null>(null);

  const [anyDataInserted, setAnyDataInserted] = useState<boolean>(false);

  const [reserved, setReserved] = useState<boolean | null>(null);
  const handleReserved = (newState: boolean) => {
    setReserved((state) => (state === newState ? null : newState));
  };

  const handleReset = () => {
    setName("");
    setCpf("");
    setBirth("");
    setPhone("");
    setAddress("");
    setPlan(0);
    setStartDate("");
    setEntrance("");
    setStandardEntrance(true);
    setObs("");
    setDigitalContract("");
    setSelectedItem(null);
    setStage(null);
    setReserved(null);
    setError(false);
  };

  const [popupConfirm, setPopupConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (clientsResponseData === StatusResponses.Success) {
      setResponsesPopup(StatusResponses.Success);
      setStage(null);
    } else if (clientsResponseData === StatusResponses.Failure) {
      setResponsesPopup(StatusResponses.Failure);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsResponseData]);

  return (
    <div
      className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white relative"
      onMouseMove={() => reserved !== null && responsesPopup && setResponsesPopup(null)}
    >
      <div className="w-full h-full">
        <Header page={PageSelector.AdminNewClient} />
      </div>

      {!isLoading && (
        <>
          {user && checkRoles(UserRoles.Admins) ? (
            <>
              {responsesPopup === StatusResponses.Loading ? (
                <LoadingStatus />
              ) : (
                <>
                  {/* POPUP CONFIRM DIV */}
                  <div
                    className={twMerge(
                      "absolute hidden flex-col gap-5 items-center justify-center w-full h-full",
                      "bg-black bg-opacity-90 z-[99]",
                      popupConfirm && "flex"
                    )}
                    id="ConfirmDiv"
                  >
                    <div
                      className={twMerge(
                        "absolute right-10 top-10",
                        "ease-in-out duration-100 active:duration-100 hover:scale-125 active:scale-90"
                      )}
                      onClick={() => setPopupConfirm(false)}
                    >
                      <CloseIcon className="" stroke="white" width={70} />
                    </div>
                    <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
                      DESEJA REALMENTE LIMPAR AS INFORMAÇÕES INSERIDAS?
                    </h1>
                    <div className="flex gap-4">
                      <Button
                        className="hover:text-green-500 hover:border-green-500"
                        onClick={() => {
                          handleReset(), setPopupConfirm(false);
                        }}
                      >
                        <h1> Sim </h1>
                      </Button>
                      <Button
                        className="hover:text-red-500 hover:border-red-500"
                        onClick={() => setPopupConfirm(false)}
                      >
                        <h1> Não </h1>
                      </Button>
                    </div>
                  </div>

                  {/* PAGE CONTENT */}
                  <div className="flex flex-col m-auto py-6 items-center">
                    <div className="flex flex-col items-center">
                      <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold select-none mb-2">
                        O LOTE DO CLIENTE JÁ POSSUI RESERVA?
                      </h1>
                      <div className="flex gap-3 m-4">
                        <Button
                          className={twMerge(
                            "hover:text-green-500 hover:border-green-500",
                            reserved &&
                              `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold
                        hover:shadow-white shadow-md hover:border-green-500`
                          )}
                          onClick={() => {
                            if (!anyDataInserted) {
                              handleReserved(true);
                              setLotesStatus(LotesStatus.Blocked);
                            } else {
                              setPopupConfirm(true);
                              setTimeout(() => {
                                const locationRef = document.getElementById("ConfirmDiv");
                                locationRef?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                              }, 100);
                            }
                          }}
                        >
                          <h1> Sim </h1>
                        </Button>
                        <Button
                          className={twMerge(
                            "hover:text-red-500 hover:border-red-500",
                            reserved === false &&
                              `border-red-500 bg-red-500 text-black1 hover:text-black1
                          font-bold hover:shadow-white shadow-md hover:border-red-500`
                          )}
                          onClick={() => {
                            if (!anyDataInserted) {
                              handleReserved(false);
                              setLotesStatus(LotesStatus.Free);
                            } else {
                              setPopupConfirm(true);
                            }
                          }}
                        >
                          <h1> Não </h1>
                        </Button>
                      </div>

                      <StatusPopup responsesPopup={responsesPopup} />

                      {reserved !== null && (
                        <>
                          <AdminSearchFilters
                            stage={stage}
                            handleStage={handleStage}
                            page={PageSelector.AdminNewClient}
                            lotesStatus={lotesStatus}
                          />

                          <AdminReservationsSelect
                            options={lotesData
                              ?.filter((value) => value.situation === lotesStatus && value)
                              ?.filter((value) => {
                                if (stage !== null) {
                                  if (stage === value.phase) {
                                    return value;
                                  }
                                } else {
                                  return value;
                                }
                              })
                              .sort((a, b) => a.value - b.value)}
                            placeholder={
                              lotesStatus === LotesStatus.Free
                                ? "Digite aqui ou Escolha o Lote"
                                : "Digite o Lote ou o Nome do Cliente"
                            }
                            onChange={(selection: LotesDataInterface | null) => {
                              setSelectedItem(selection),
                                reserved === true &&
                                  (setName(selection?.reservedFor),
                                  setPhone(
                                    selection?.reservedForContact !== null ? selection?.reservedForContact : ""
                                  ));
                            }}
                            setSelectRef={setSelectRef}
                            lotesStatus={lotesStatus}
                          />

                          <b
                            className={twMerge(
                              "invisible text-red-500 text-sm",
                              !selectedItem && error && "visible animate-pulse"
                            )}
                          >
                            {!reserved ? "Selecione um Lote!" : "Selecione uma reserva!"}
                          </b>

                          <AdminNewClientInfos
                            name={name}
                            setName={setName}
                            cpf={cpf}
                            setCpf={setCpf}
                            birth={birth}
                            setBirth={setBirth}
                            phone={phone}
                            setPhone={setPhone}
                            address={address}
                            setAddress={setAddress}
                            plan={plan}
                            setPlan={setPlan}
                            startDate={startDate}
                            setStartDate={setStartDate}
                            entrance={entrance}
                            setEntrance={setEntrance}
                            standardEntrance={standardEntrance}
                            setStandardEntrance={setStandardEntrance}
                            contractNumber={contractNumber}
                            setContractNumber={setContractNumber}
                            standard={standard}
                            setStandard={setStandard}
                            setObs={setObs}
                            digitalContract={digitalContract}
                            setDigitalContract={setDigitalContract}
                            selectedItem={selectedItem}
                            allDataInserted={allDataInserted}
                            error={error}
                            setError={setError}
                            anyDataInserted={anyDataInserted}
                            setAnyDataInserted={setAnyDataInserted}
                          />

                          {/* SENT BUTTON */}
                          <div className="flex flex-col gap-2 items-center">
                            <div
                              className={twMerge(
                                "font-bold text-gray1 w-fit p-4 select-none",
                                "ease-in-out duration-200 active:duration-100 cursor-not-allowed",
                                "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl border-gray1",
                                allDataInserted &&
                                  "hover:text-yellow1 hover:scale-110 active:scale-90 hover:border-yellow1 border-white text-white cursor-pointer"
                              )}
                              onClick={() => {
                                if (!allDataInserted) {
                                  setError(true);
                                } else {
                                  handleSubmit(
                                    {
                                      name,
                                      cpf,
                                      birth: birth.split("-").reverse().join("-"),
                                      address,
                                      phone,
                                      digitalContract,
                                      contractNumber:
                                        selectedItem?.phase === 1
                                          ? `202208-${contractNumber}`
                                          : selectedItem?.phase === 2
                                          ? `202309-${contractNumber}`
                                          : "",
                                      phase: selectedItem?.phase,
                                      lote: selectedItem?.label,
                                      dimension: selectedItem?.size,
                                      price: selectedItem?.price,
                                      plan,
                                      startDate: handleStartDate(),
                                      standard: standard,
                                      entrance: !standardEntrance
                                        ? parseFloat(entrance.replace("R$", "").replaceAll(".", "").replace(",", "."))
                                        : null,
                                      obs,
                                    },
                                    Methods.POST
                                  );
                                  setResponsesPopup(StatusResponses.Loading);
                                  handleReset();
                                }
                              }}
                            >
                              <h1> Criar Cliente </h1>
                            </div>
                            <div
                              className={twMerge(
                                "invisible text-red-500 text-sm text-center",
                                !allDataInserted && error && "visible"
                              )}
                            >
                              <b>ERRO!</b>
                              <h1>Um ou mais campos estão em branco, complete todos os campos.</h1>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
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
