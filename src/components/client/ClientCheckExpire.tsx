import { twMerge } from "tailwind-merge";
import { ExpireIcon } from "../utils/Icons";
import { ClientsDataInterface, PlanMonths, PlansSelector } from "@/types";

interface ClientPageContentExpireInterface {
  data: ClientsDataInterface;
  priceCalc: (value: number) => string;
  paidParcels: number;
  dateCompare: (startDate: string, returnType: PlansSelector) => string | number | boolean | undefined;
}

export default function ClientCheckExpire(props: ClientPageContentExpireInterface) {
  const monthsExpired = props.dateCompare(props.data.startDate, PlansSelector.MonthsExpired);
  const paidParcels = props.paidParcels;

  // BRAZIL CURRENCY FORMATTER
  const localeString = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // SAFE NUMBER PARSER
  const parseBrazilianNumber = (val: string | number): number => {
    if (typeof val === "number") return val;
    return parseFloat(val.replace(/\./g, "").replace(",", "."));
  };

  // Function to calculate readjusted value according to the payment year
  const readjustPlan = (year: PlanMonths) => {
    const price = props.data.entrance ? props.data.price - props.data.entrance : props.data.price;

    const firstYear = price / props.data.plan;
    const debtFirstYear = price - firstYear * 12;

    const secondYear = debtFirstYear + debtFirstYear * 0.05;
    const debtSecondYear = secondYear - (secondYear / (props.data.plan - 12)) * 12;

    const thirdYear = debtSecondYear + debtSecondYear * 0.05;
    const debtThirdYear = thirdYear - (thirdYear / (props.data.plan - 24)) * 12;

    const fourthYear = debtThirdYear + debtThirdYear * 0.05;
    const debtFourthYear = fourthYear - (fourthYear / (props.data.plan - 36)) * 12;

    const fifthYear = debtFourthYear + debtFourthYear * 0.05;

    if (year === PlanMonths.SecondYear) {
      return secondYear / (props.data.plan - 12);
    } else if (year === PlanMonths.ThirdYear) {
      return thirdYear / (props.data.plan - 24);
    } else if (year === PlanMonths.FourthYear) {
      return fourthYear / (props.data.plan - 36);
    } else if (year === PlanMonths.FifthYear) {
      return fifthYear / (props.data.plan - 48);
    } else {
      return 0;
    }
  };

  // EXPIRED CALCULATOR - Debt Balance Calculator
  const expiredDebtBalance = () => {
    const expireDate = new Date(props.data.startDate.split("-").reverse().join("-"));
    expireDate.setMonth(expireDate.getMonth() + paidParcels + 1);
    expireDate.setDate(expireDate.getDate() + 1);

    const dateDiff = Math.ceil(
      Math.abs(new Date().valueOf() - expireDate.valueOf()) / (1000 * 60 * 60 * 24) / 30
    );

    // SAFE PARSER USE 
    const planValue = parseBrazilianNumber(props.priceCalc(props.data.plan));

    if (paidParcels < 12) {
      return localeString(dateDiff * planValue);
    } else if (paidParcels >= 12 && paidParcels < 24) {
      return localeString(dateDiff * readjustPlan(PlanMonths.SecondYear));
    } else if (paidParcels >= 24 && paidParcels < 36) {
      return localeString(dateDiff * readjustPlan(PlanMonths.ThirdYear));
    } else if (paidParcels >= 36 && paidParcels < 48) {
      return localeString(dateDiff * readjustPlan(PlanMonths.FourthYear));
    } else if (paidParcels >= 48 && paidParcels < 60) {
      return localeString(dateDiff * readjustPlan(PlanMonths.FifthYear));
    }
  };

  return (
    <div className="flex flex-col w-full m-auto items-center gap-2 py-3 response:px-0">
      <div className="flex items-center response:p-0">
        <ExpireIcon
          className={twMerge(
            "fill-red-500",
            props.dateCompare(props.data.startDate, PlansSelector.IsLate) && "fill-blue-300",
            props.priceCalc(PlansSelector.Debt) === "0,00" && "fill-green-300",
            props.data.plan === 0 && "fill-green-300"
          )}
          width={50}
          fill=""
          stroke="none"
        />
        <h1
          className={twMerge(
            "text-red-500 leading-tight",
            props.dateCompare(props.data.startDate, PlansSelector.IsLate) && "text-blue-300",
            props.priceCalc(PlansSelector.Debt) === "0,00" && "text-green-300",
            props.data.plan === 0 && "text-green-300"
          )}
        >
          <b>Status: </b>
          {props.data.standard && props.data.status ? (
            <>
              {props.priceCalc(PlansSelector.Debt) === "0,00" || props.data.plan === 0 ? (
                "QUITADO"
              ) : props.dateCompare(props.data.startDate, PlansSelector.IsLate) ? (
                "REGULAR - Em dias"
              ) : (
                <>
                  VENCIDO <br />
                  {monthsExpired} Meses
                  <b> ATRASADOS</b>
                  <br />
                  <b>Total: </b>
                  {expiredDebtBalance()}
                </>
              )}
            </>
          ) : !props.data.status ? (
            "CLIENTE DESISTENTE"
          ) : (
            "CLIENTE ESPECIAL"
          )}
        </h1>
      </div>
    </div>
  );
}