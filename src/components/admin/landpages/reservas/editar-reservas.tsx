import {
  FilterSelector,
  LotesDataInterface,
  LotesStatus,
  Methods,
  PageSelector,
  StatusResponses,
  UserRoles,
} from "@/types";
import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import React, { useEffect, useState } from "react";
import { useLotesData } from "@/context/LotesDataContext";
import { Button } from "@/components/utils/Button";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/components/utils/Icons";
import AdminReservationsSelect from "@/components/admin/reservation/AdminReservationsSelect";
import AdminDeleteReservation from "@/components/admin/reservation/AdminDeleteReservation";
import AdminCreateReservation from "@/components/admin/reservation/AdminCreateReservation";
import AdminUpdateReservation from "@/components/admin/reservation/AdminUpdateReservation";
import StatusPopup from "@/components/utils/StatusPopup";
import LoadingStatus from "@/components/utils/LoadingStatus";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface AdminEditReservationsInterface {
  checkRoles: (role: string) => boolean | undefined;
  user: UserProfile | undefined;
}

export default function AdminEditReservations({ checkRoles, user }: AdminEditReservationsInterface) {
  const { lotesData, lotesResponseData, setLotesResponseData } = useLotesData();

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
    if (lotesResponseData === StatusResponses.Success) {
      setSelectedItem(null);
      setActionType(null);
      setResponsesPopup(StatusResponses.Success);
      setLotesStatus(null);
      clearValue();
    } else if (lotesResponseData === StatusResponses.Failure) {
      setSelectedItem(null);
      setActionType(null);
      setResponsesPopup(StatusResponses.Failure);
      setLotesStatus(null);
      clearValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotesResponseData]);

  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {/* ACTION TYPE SELECTOR - MAIN PAGE*/}
      <div
        className="flex flex-col m-auto items-center px-3"
        onMouseMove={() =>
          setTimeout(() => {
            !actionType && responsesPopup && setResponsesPopup(null);
          }, 3000)
        }
      >
        <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none mb-2">
          SELECIONE UMA AÇÃO
        </h1>
        <div className="flex response:flex-row flex-col m-auto items-center gap-5">
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
              setLotesResponseData(0);
              setResponsesPopup(null);
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
              setLotesResponseData(0);
              setResponsesPopup(null);
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
              setLotesResponseData(0);
              setResponsesPopup(null);
            }}
          >
            <h1> Remover uma reserva </h1>
          </Button>
        </div>
        <StatusPopup responsesPopup={responsesPopup} />
      </div>

      {/* POP-UP PAGE */}
      <div
        className={twMerge(
          "absolute hidden flex-col bg-black bg-opacity-95 z-50 top-0 left-0 w-full h-full items-center justify-center",
          actionType !== null && "flex"
        )}
      >
        <div className="flex flex-col m-auto py-4">
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
                })
                .filter((value) => {
                  if (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) {
                    return value;
                  } else {
                    return value.situation === LotesStatus.Blocked
                      ? value.reservedBy === user?.name?.split(" ")[0] && value
                      : value;
                  }
                })
                .sort((a, b) => a.value - b.value)}
              placeholder={"Digite o Lote ou o Nome do Cliente"}
              onChange={(selection: LotesDataInterface | null) => setSelectedItem(selection)}
              lotesStatus={lotesStatus}
              setSelectRef={setSelectRef}
            />
          </div>

          {responsesPopup === StatusResponses.Loading ? (
            <LoadingStatus />
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
    </>
  );
}
