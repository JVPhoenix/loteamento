import { ClientsDataInterface, PageSelector, PlansSelector } from "@/types";
import { twMerge } from "tailwind-merge";
import {
  ContractIcon,
  DebtBalanceIcon,
  EntranceIcon,
  ExpireIcon,
  LastPaidIcon,
  DimensionIcon,
  PaidIcon,
  LoteIcon,
  StageIcon,
  ValueIcon,
  PlanIcon,
  ObsIcon,
  DayIcon,
  DayPaid,
} from "../svg/Icons";
import Contacts from "../home/Contacts";
import ClientPageContentUser from "./ClientPageContentUser";
import ClientCheckExpire from "./ClientCheckExpire";
import { Button } from "../admin/Button";

interface ClientPageInfoInterface {
  data: ClientsDataInterface;
  page: PageSelector;
  handleResetOptions?: () => void;
}

export default function ClientPageContent(props: ClientPageInfoInterface) {
  const ExpireDay = new Date(props.data.startDate.split("-").reverse().join("-")).getDate() + 1;
  const LastMonth = new Date(props.data.lastPaid.split("-").reverse().join("-"));

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

    const dateDiff = Math.ceil(Math.abs(today.valueOf() - expireDate.valueOf()) / (1000 * 60 * 60 * 24) / 30);

    if (returnType === PlansSelector.IsLate) {
      return today < expireDate;
    } else if (returnType === PlansSelector.MonthsExpired) {
      return dateDiff;
    }
  };

  return (
    <>
      <div className="flex flex-col w-full m-auto items-center">
        <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold pt-8 ">USUÁRIO ENCONTRADO</h1>
        {!props.data.standard && props.page !== PageSelector.AdminLogin ? (
          <div className="flex flex-col justify-center items-center m-5">
            <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold mb-2 ">
              CONTRATO ESPECIAL
            </h1>
            <h1>
              O contrato do Sr(a) <b>{props.data.name}</b> é do tipo <b>ESPECIAL</b>, e possui algumas variâncias.
            </h1>
            <h1>Por isso só pode ser consultado mediante contato direto com algum dos envolvidos com o Loteamento!</h1>
          </div>
        ) : (
          <div className="flex flex-col w-full items-center px-5 response:p-0">
            <ClientPageContentUser data={props.data} />
            <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold ">
              INFORMAÇÕES DO CONTRATO
            </h1>

            <ClientCheckExpire
              data={props.data}
              dateCompare={dateCompare}
              priceCalc={priceCalc}
              paidParcels={paidParcels}
            />

            <div
              className={twMerge("flex flex-col justify-between pb-4 px-2", "response:w-auto response:min-w-[700px]")}
            >
              <div
                className={twMerge(
                  "flex flex-col text-center",
                  "response:text-left response:m-auto response:items-center response:gap-1"
                )}
              >
                <h1 className="text-green-600 text-xl response:text-2xl font-bold ">LOCALIZAÇÃO</h1>
                <div className="flex flex-col pb-5 response:flex-row response:gap-4">
                  <div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <ContractIcon className="" width={50} fill="white" stroke="none" />
                      </div>
                      <h1>
                        <b>Contrato: </b> {props.data.contractNumber}
                      </h1>
                    </div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <StageIcon className="" width={50} fill="none" stroke="white" />
                      </div>
                      <h1>
                        <b>Etapa: </b> {props.data.phase}ª
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <LoteIcon className="" width={50} fill="white" stroke="none" />
                      </div>
                      <h1>
                        <b>Lote: </b> {props.data.lote}
                      </h1>
                    </div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <DimensionIcon className="" width={50} fill="white" stroke="none" />
                      </div>
                      <h1 className="leading-none response:w-64">
                        <b>Dimensão: </b>
                        {props.data.dimension}
                      </h1>
                    </div>
                  </div>
                </div>
                <h1 className="text-green-600 text-xl response:text-2xl font-bold ">VALORES</h1>
                <div className="flex flex-col pb-5 response:flex-row response:gap-4">
                  <div>
                    <div>
                      <div className="flex leading-tight items-center gap-1">
                        <div>
                          <PlanIcon className="" width={50} fill="white" stroke="none" plan={props.data.plan} />
                        </div>
                        <h1>
                          <b>Plano: </b>
                          {props.data.plan === 0
                            ? "A Vista"
                            : `${props.data.plan}x de R$ ${priceCalc(props.data.plan)}`}
                        </h1>
                      </div>
                    </div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <DayIcon className="" width={50} fill="white" stroke="none" plan={props.data.plan} />
                      </div>
                      <h1>
                        <b>Vencimento dia: </b>
                        {ExpireDay}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <ValueIcon className="" width={48} fill="white" stroke="none" />
                      </div>
                      <h1>
                        <b>Valor Total: </b> R${" "}
                        {props.data.entrance
                          ? (props.data.price + props.data.entrance).toLocaleString("pt-br", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : priceCalc(PlansSelector.ContractPrice)}
                      </h1>
                    </div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <EntranceIcon className="" width={50} fill="none" stroke="white" />
                      </div>
                      <b>Entrada: </b>R${" "}
                      <h1>
                        {props.data.entrance
                          ? props.data.entrance.toLocaleString("pt-br", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : props.data.plan === 0
                          ? 0
                          : priceCalc(PlansSelector.Entrance)}
                      </h1>
                    </div>
                  </div>
                </div>
                <h1 className="text-green-600 text-xl response:text-2xl font-bold ">PAGAMENTO</h1>
                <div className="flex flex-col pb-5 response:flex-row response:gap-4">
                  <div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <DebtBalanceIcon className="" width={50} fill="none" stroke="white" />
                      </div>
                      <h1>
                        <b>Saldo Devedor: </b>
                        {props.data.standard ? (
                          <>R$ {props.data.plan === 0 ? 0 : priceCalc(PlansSelector.Debt)}</>
                        ) : (
                          "ERRO"
                        )}
                      </h1>
                    </div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <PaidIcon className="" width={50} fill="none" stroke="white" />
                      </div>
                      <h1>
                        <b>Nº de Parcelas Pagas: </b>
                        {props.data.standard ? <>{paidParcels(props.data.startDate, props.data.lastPaid)}</> : "ERRO"}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <LastPaidIcon className="" width={50} fill="white" stroke="none" />
                      </div>
                      <h1>
                        <b>Ultimo mês pago: </b>{" "}
                        {LastMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                      </h1>
                    </div>
                    <div className="flex leading-tight items-center gap-1">
                      <div>
                        <DayPaid className="" width={50} fill="none" stroke="white" />
                      </div>
                      <h1>
                        <b>Dia pago: </b> {props.data.datePaid}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {props.page === PageSelector.ClientSearch && (
          <>
            <Button className="mb-8" onClick={() => props.handleResetOptions?.()}>
              <h1> FAÇA UMA NOVA BUSCA </h1>
            </Button>
            <Contacts page={PageSelector.ClientSearch} />
          </>
        )}
      </div>
    </>
  );
}
