import { ClientsDataInterface, Methods, PageSelector, PlansSelector } from "@/types";
import { twMerge } from "tailwind-merge";
import {
  ContractIcon,
  DebtBalanceIcon,
  EntranceIcon,
  LastPaidIcon,
  DimensionIcon,
  PaidIcon,
  LoteIcon,
  StageIcon,
  ValueIcon,
  PlanIcon,
  DayIcon,
  DayPaid,
  ObsIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
} from "../utils/Icons";
import Contacts from "../home/Contacts";
import ClientPageContentUser from "./ClientPageContentUser";
import ClientCheckExpire from "./ClientCheckExpire";
import { Button } from "../utils/Button";
import ClientPagePaymentList from "./ClientPagePaymentList";

interface ClientPageInfoInterface {
  data: ClientsDataInterface;
  page: PageSelector;
  handleResetOptions?: () => void;
  handleActionType?: (newState: Methods) => void;
}

export default function ClientPageContent(props: ClientPageInfoInterface) {
  const startDate = new Date(props.data.startDate.split("-").reverse().join("-"));
  const expireDay = startDate.getDate() + 1;

  const diffZero = props.data.paymentList[0] !== "" ? props.data.paymentList.length : 0;
  const lastMonthPaid = new Date(startDate.setMonth(startDate.getMonth() + diffZero)).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const priceCalc = (value: number) => {
    if (value === PlansSelector.ContractPrice) {
      if (props.data.plan === 0) {
        return props.data.price.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
        return (props.data.price / value + props.data.price * 0.1).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    } else if (value === PlansSelector.Debt) {
      return (props.data.price - (diffZero * props.data.price) / props.data.plan).toLocaleString("pt-br", {
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

  const dateCompare = (startDate: string, returnType: PlansSelector) => {
    const today = new Date();
    const expireDate = new Date(startDate.split("-").reverse().join("-"));

    expireDate.setMonth(expireDate.getMonth() + props.data.paymentList.length + 1); // set 1 moth later (30 days)
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
        <div className="flex flex-col w-full items-center px-5 response:p-0">
          <ClientPageContentUser data={props.data} />
          <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold ">
            INFORMAÇÕES DO CONTRATO
          </h1>

          <ClientCheckExpire
            data={props.data}
            dateCompare={dateCompare}
            priceCalc={priceCalc}
            paidParcels={props.data.paymentList.length}
          />

          {props.data.obs ? (
            <div className="flex gap-2 items-center justify-center py-3">
              <div className="flex items-center gap-2 text-yellow-400 leading-tight">
                <div>
                  <ObsIcon className="" width={50} fill="rgba(250, 204, 21)" stroke="none" />
                </div>
                <h1 className="text-justify max-w-md">
                  <b>Obs.: </b>
                  {props.data.obs}
                </h1>
              </div>
              {props.page !== PageSelector.ClientSearch && (
                <div className="flex flex-col gap-3">
                  <DeleteIcon
                    className="hover:fill-red-500 hover:scale-125 ease-in-out duration-200 active:scale-95 select-none"
                    fill="white"
                    width={30}
                    onClick={() => props.handleActionType && props.handleActionType(Methods.DELETE)}
                  />
                  <EditIcon
                    className="hover:fill-blue-500 hover:scale-125 ease-in-out duration-200 active:scale-95 select-none"
                    fill="white"
                    width={30}
                    onClick={() => props.handleActionType && props.handleActionType(Methods.PUT)}
                  />
                </div>
              )}
            </div>
          ) : !props.data.obs && props.page !== PageSelector.ClientSearch ? (
            <Button
              className="flex items-center gap-2 leading-tight group mb-2"
              onClick={() => props.handleActionType && props.handleActionType(Methods.POST)}
            >
              <div>
                <AddIcon
                  className="fill-white group-hover:fill-[#FACC15] ease-in-out duration-200"
                  width={30}
                  stroke="none"
                />
              </div>
              <h1 className="text-justify max-w-md">
                <b>Adicionar Observação</b>
              </h1>
            </Button>
          ) : null}

          <div
            className={twMerge(
              "flex flex-col justify-between items-center pb-4 px-2",
              "response:w-auto response:min-w-[700px]"
            )}
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
                        {props.data.plan === 0 ? "A Vista" : `${props.data.plan}x de R$ ${priceCalc(props.data.plan)}`}
                      </h1>
                    </div>
                  </div>
                  <div className="flex leading-tight items-center gap-1">
                    <div>
                      <DayIcon className="" width={50} fill="white" stroke="none" plan={props.data.plan} />
                    </div>
                    <h1>
                      <b>Vencimento dia: </b>
                      {expireDay}
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
              <h1 className="text-green-600 text-xl response:text-2xl font-bold ">PAGAMENTOS</h1>
              <div className="flex flex-col pb-5 response:flex-row response:gap-4">
                <div>
                  <div className="flex leading-tight items-center gap-1">
                    <div>
                      <DebtBalanceIcon className="" width={50} fill="none" stroke="white" />
                    </div>
                    <h1>
                      <b>Saldo Devedor: </b>R$ {props.data.plan === 0 ? 0 : priceCalc(PlansSelector.Debt)}
                    </h1>
                  </div>
                  <div className="flex leading-tight items-center gap-1">
                    <div>
                      <PaidIcon className="" width={50} fill="none" stroke="white" />
                    </div>
                    <h1>
                      <b>Nº de Parcelas Pagas: </b>
                      {diffZero}
                    </h1>
                  </div>
                </div>
                <div>
                  <div className="flex leading-tight items-center gap-1">
                    <div>
                      <LastPaidIcon className="" width={50} fill="white" stroke="none" />
                    </div>
                    <h1>
                      <b>Ultimo mês pago: </b>
                      {lastMonthPaid}
                    </h1>
                  </div>
                  <div className="flex leading-tight items-center gap-1">
                    <div>
                      <DayPaid className="" width={50} fill="none" stroke="white" />
                    </div>
                    <h1>
                      <b>Dia pago: </b> {props.data.paymentList[props.data.paymentList.length - 1]}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {props.data.plan !== 0 && (
              <ClientPagePaymentList paymentList={props.data.paymentList} keyData={props.data.cpf} page={props.page} />
            )}
          </div>
        </div>
        {props.page === PageSelector.ClientSearch && (
          <>
            <Button className="my-8" onClick={() => props.handleResetOptions?.()}>
              <h1> FAÇA UMA NOVA BUSCA </h1>
            </Button>
            <Contacts page={PageSelector.ClientSearch} />
          </>
        )}
      </div>
    </>
  );
}
