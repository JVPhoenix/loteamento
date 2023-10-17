import { ClientsDataInterface, PageSelector, PlansSelector } from "@/types";
import { twMerge } from "tailwind-merge";
import {
  AdressIcon,
  BirthIcon,
  CPFIcon,
  ContractIcon,
  DebtBalanceIcon,
  EntranceIcon,
  ExpireIcon,
  LastPaidIcon,
  DimensionIcon,
  NameIcon,
  PaidIcon,
  LoteIcon,
  StageIcon,
  ValueIcon,
  PlanIcon,
  PhoneIcon,
  ObsIcon,
} from "./Icons";
import { Dispatch, SetStateAction, useState } from "react";
import Contacts from "./Contacts";

interface ClientPageInfoInterface {
  data: ClientsDataInterface;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  setSearchError: Dispatch<SetStateAction<boolean>>;
  setCpf: Dispatch<SetStateAction<string>>;
}

export default function ClientPageInfo(props: ClientPageInfoInterface) {
  const [debtParcels, setDebtParcels] = useState<number>(0);

  const priceCalc = (value: number) => {
    if (value === PlansSelector.ContractPrice) {
      return (props.data.price / value + props.data.price * 0.1).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else if (value === PlansSelector.Debt) {
      return (
        props.data.price -
        (paidParcels(props.data.startDate, props.data.lastPaid) * props.data.price) / props.data.plan
      ).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return (props.data.price / value).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };

  const paidParcels = (startDate: string, lastPaid: string) => {
    const start = new Date(startDate.split("-").reverse().join("-"));
    const last = new Date(lastPaid.split("-").reverse().join("-"));
    return last.getMonth() - start.getMonth() + 12 * (last.getFullYear() - start.getFullYear());
  };

  const dateCompare = (lastPaid: string, startDate: string, returnType: PlansSelector) => {
    const today = new Date();
    const expireDate = new Date(startDate.split("-").reverse().join("-"));

    expireDate.setMonth(expireDate.getMonth() + paidParcels(startDate, lastPaid) + 1); // set 1 moth later (30 days)
    expireDate.setDate(expireDate.getDate() + 1); // set +1 day (to set the same day every month)

    if (returnType === PlansSelector.IsLate) {
      return today < expireDate;
    } else if (returnType === PlansSelector.MontsLate) {
      return today.getMonth() - expireDate.getMonth() + 1;
    }
  };

  const handleResetOptions = () => {
    props.setCpf("");
    props.setSelectedOption("");
    props.setSearchError(false);
  };

  return (
    <>
      <div className="flex flex-col w-full m-auto items-center">
        <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-2 select-none">
          USUÁRIO ENCONTRADO
        </h1>
        {!props.data.standard ? (
          <div className="flex flex-col justify-center items-center m-5">
            <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-2 select-none">
              CONTRATO ESPECIAL
            </h1>
            <h1>
              O contrato do Sr(a) <b>{props.data.name}</b> é do tipo <b>ESPECIAL</b>, e possui algumas variâncias.
            </h1>
            <h1>Por isso só pode ser consultado mediante contato direto com algum dos envolvidos com o Loteamento!</h1>
          </div>
        ) : (
          <>
            <div className="flex flex-col mb-4 response:gap-1 w-96">
              <div className="flex leading-tight items-center">
                <div>
                  <NameIcon className="" width={50} fill="none" stroke="white" />
                </div>
                <h1>
                  <b>Nome: </b>
                  {props.data.name}
                </h1>
              </div>
              <div className="flex leading-tight items-center">
                <div>
                  <CPFIcon className="" width={50} fill="none" stroke="white" />
                </div>
                <h1>
                  <b>CPF: </b>
                  {props.data.cpf}
                </h1>
              </div>
              <div className="flex leading-tight items-center">
                <div>
                  <BirthIcon className="" width={50} fill="none" stroke="white" />
                </div>
                <h1>
                  <b>Data de Nascimento: </b>
                  {props.data.birth}
                </h1>
              </div>
              <div className="flex leading-tight items-center">
                <div>
                  <AdressIcon className="" width={50} fill="none" stroke="white" />
                </div>
                <h1>
                  <b>Endereço: </b>
                  {props.data.adress}
                </h1>
              </div>
              <div className="flex leading-tight items-center">
                <div>
                  <PhoneIcon className="" width={50} fill="none" stroke="white" />
                </div>
                <h1>
                  <b>Telefone: </b>
                  {props.data.phone}
                </h1>
              </div>
            </div>
            <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-2 select-none">
              CONTRATO
            </h1>
            <div className="flex flex-col w-full items-center gap-2 px-8 pb-3 response:px-0">
              <div className="flex items-center response:p-0">
                <ExpireIcon
                  className={twMerge(
                    "fill-red-500",
                    dateCompare(props.data.lastPaid, props.data.startDate, PlansSelector.IsLate) && "fill-blue-300",
                    priceCalc(PlansSelector.Debt) === "0,00" && "fill-green-300",
                    props.data.plan === 0 && "fill-green-300"
                  )}
                  width={50}
                  fill=""
                  stroke="none"
                />
                <h1
                  className={twMerge(
                    "text-red-500 leading-tight",
                    dateCompare(props.data.lastPaid, props.data.startDate, PlansSelector.IsLate) && "text-blue-300",
                    priceCalc(PlansSelector.Debt) === "0,00" && "text-green-300",
                    props.data.plan === 0 && "text-green-300"
                  )}
                >
                  <b>Status: </b>
                  {priceCalc(PlansSelector.Debt) === "0,00" || props.data.plan === 0 ? (
                    "QUITADO"
                  ) : dateCompare(props.data.lastPaid, props.data.startDate, PlansSelector.IsLate) ? (
                    "PAGAMENTO EM DIAS - REGULAR"
                  ) : (
                    <>
                      VENCIDO <br />
                      <b>
                        {dateCompare(props.data.lastPaid, props.data.startDate, PlansSelector.MontsLate)} Meses
                        ATRASADOS
                      </b>
                    </>
                  )}
                </h1>
              </div>

              {props.data.obs && (
                <div className="flex items-center gap-2 text-yellow-400 leading-tight">
                  <div>
                    <ObsIcon className="" width={50} fill="rgba(250, 204, 21)" stroke="none" />
                  </div>
                  <h1 className="text-justify max-w-md">
                    <b>Obs.: </b>
                    {props.data.obs}
                  </h1>
                </div>
              )}
            </div>

            <div
              className={twMerge(
                "flex flex-col justify-between items-center mb-4 w-80",
                "response:flex-row response:gap-4 response:w-full"
              )}
            >
              <div className="flex gap-1">
                <div className="flex flex-col">
                  <ContractIcon className="" width={50} fill="white" stroke="none" />
                  <StageIcon className="" width={50} fill="none" stroke="white" />
                  <LoteIcon className="" width={50} fill="white" stroke="none" />
                  <DimensionIcon className="" width={50} fill="white" stroke="none" />
                  <PlanIcon className="" width={50} fill="white" stroke="none" plan={props.data.plan} />
                </div>
                <div className="flex flex-col py-3 w-full justify-between">
                  <h1>
                    <b>Contrato: </b> {props.data.contractNumber}
                  </h1>
                  <h1>
                    <b>Etapa: </b> {props.data.phase}ª
                  </h1>
                  <h1>
                    <b>Lote: </b> {props.data.lote}
                  </h1>
                  <h1 className="leading-none">
                    <b>Dimensão: </b>
                    {props.data.dimension}
                  </h1>
                  <h1>
                    <b>Plano: </b>
                    {props.data.plan === 0 ? "A Vista" : `${props.data.plan}x de R$ ${priceCalc(props.data.plan)}`}
                  </h1>
                </div>
              </div>

              <div className="flex gap-1">
                <div className="flex flex-col">
                  <ValueIcon className="" width={48} fill="white" stroke="none" />
                  <DebtBalanceIcon className="" width={50} fill="none" stroke="white" />
                  <EntranceIcon className="" width={50} fill="none" stroke="white" />
                  <LastPaidIcon className="" width={50} fill="white" stroke="none" />
                  <PaidIcon className="" width={50} fill="none" stroke="white" />
                </div>
                <div className="flex flex-col py-3 w-full justify-between">
                  <h1>
                    <b>Valor Total: </b> R${" "}
                    {props.data.entrance
                      ? (props.data.price + props.data.entrance).toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : priceCalc(PlansSelector.ContractPrice)}
                  </h1>
                  <h1>
                    <b>Saldo Devedor: </b>R$ {props.data.plan === 0 ? 0 : priceCalc(PlansSelector.Debt)}
                  </h1>
                  <h1>
                    <b>Entrada: </b>R${" "}
                    {props.data.entrance
                      ? props.data.entrance.toLocaleString("pt-br", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : props.data.plan === 0
                      ? 0
                      : priceCalc(PlansSelector.Entrance)}
                  </h1>
                  <h1>
                    <b>Nº de Parcelas Pagas: </b> {paidParcels(props.data.startDate, props.data.lastPaid)}
                  </h1>
                  <h1>
                    <b>Ultima Parcela Paga: </b> {props.data.lastPaid}
                  </h1>
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className={twMerge(
            "ease-in-out duration-200 mb-8 w-auto p-4 select-none active:duration-100 cursor-not-allowed",
            "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl",
            "hover:text-yellow1 hover:scale-110 active:scale-90 hover:border-yellow1 border-white text-white cursor-pointer"
          )}
          onClick={() => handleResetOptions()}
        >
          <h1> FAÇA UMA NOVA BUSCA </h1>
        </div>
        {props.data.standard && <Contacts page={PageSelector.Client} />}
      </div>
    </>
  );
}
