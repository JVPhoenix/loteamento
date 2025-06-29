import {
  ClientsDataInterface,
  FilterSelector,
  LotesDataInterface,
  ordinalPlansNames,
  PageSelector,
  PlanMonths,
} from "@/types";
import { PlanIcon } from "../../utils/Icons";
import { useState } from "react";
import { MultiValue } from "react-select";
import { TextField } from "@mui/material";

interface AdminReadjustInterface {
  client?: ClientsDataInterface | null;
  lote?: MultiValue<LotesDataInterface> | null;
  stage?: FilterSelector | null;
  page: PageSelector;
}

export default function AdminReadjust(props: AdminReadjustInterface) {
  const [selectedPlan, setSelectedPlan] = useState<number | "">(0);
  const plan = () => {
    if (props.page === PageSelector.AdminReadjustClient) {
      return props.client ? props.client?.plan : 0;
    } else if (props.page === PageSelector.AdminReadjustSimulate) {
      return selectedPlan || 1;
    } else {
      return 0;
    }
  };

  const price = () => {
    if (props.page === PageSelector.AdminReadjustClient) {
      if (props.client?.entrance) {
        return props.client.price - props.client.entrance;
      } else {
        return props.client ? props.client?.price : 0;
      }
    } else if (props.page === PageSelector.AdminReadjustSimulate) {
      return props.lote ? props.lote.reduce((accumulator, value) => (accumulator = accumulator + value.price), 0) : 0;
    } else {
      return 0;
    }
  };

  const localeString = (value: number) => {
    return value.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const priceCalc = (year: number) => {
    const firstYear = price() / plan();
    const debtFirstYear = price() - firstYear * 12;

    const secondYear = debtFirstYear + debtFirstYear * 0.05;
    const debtSecondYear = secondYear - (secondYear / (plan() - 12)) * 12;

    const thirdYear = debtSecondYear + debtSecondYear * 0.05;
    const debtThirdYear = thirdYear - (thirdYear / (plan() - 24)) * 12;

    const FourthYear = debtThirdYear + debtThirdYear * 0.05;
    const debtFourthYear = FourthYear - (FourthYear / (plan() - 36)) * 12;

    const FifthYear = debtFourthYear + debtFourthYear * 0.05;

    if (year <= PlanMonths.FirstYear) {
      return firstYear;
    } else if (year <= PlanMonths.SecondYear) {
      return secondYear / (plan() - 12);
    } else if (year <= PlanMonths.ThirdYear) {
      return thirdYear / (plan() - 24);
    } else if (year <= PlanMonths.FourthYear) {
      return FourthYear / (plan() - 36);
    } else if (year <= PlanMonths.FifthYear) {
      return FifthYear / (plan() - 48);
    } else {
      return 0;
    }
  };

  const parcelsCalculator = () => {
    const fullYears = Math.floor(plan() / 12);
    const remainingMonths = plan() % 12;
    const parts: number[] = [];

    for (let i = 0; i < fullYears; i++) {
      parts.push(12);
    }
    if (remainingMonths > 0) {
      parts.push(remainingMonths);
    }

    return parts.map((months, index) => ({
      months,
      monthsAccumulated: parts.slice(0, index + 1).reduce((a, b) => a + b, 0),
    }));
  };

  return (
    <div className="flex flex-col m-auto w-full items-center gap-4">
      <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold">
        {props.page === PageSelector.AdminReadjustClient && plan()
          ? `Reajustes para o Plano de ${plan() / 12} anos`
          : props.page === PageSelector.AdminReadjustSimulate
          ? "Digite a quantidade de parcelas do plano"
          : null}
      </h1>
      {props.page === PageSelector.AdminReadjustSimulate && (
        <TextField
          label="Número de Parcelas"
          variant="filled"
          className="bg-white rounded-lg"
          type="number"
          value={selectedPlan}
          onChange={(e) => {
            const rawValue = e.target.value;

            if (rawValue === "") {
              setSelectedPlan("");
              return;
            }

            const value = Number(rawValue);

            if (Number.isNaN(value)) {
              return;
            }

            if (value > 60) {
              setSelectedPlan(60);
            } else if (value < 1) {
              setSelectedPlan(1);
            } else {
              setSelectedPlan(value);
            }
          }}
        />
      )}
      <div className="flex flex-col gap-4 text-center">
        {parcelsCalculator().map((installment, index) => (
          <div key={installment.monthsAccumulated} className="flex items-center gap-2">
            <PlanIcon className="" width={40} plan={installment.monthsAccumulated} fill="white" />
            <h1 className="text-white text-lg response:text-xl font-bold">{ordinalPlansNames[index]} Ano:</h1>
            <h1 className="text-white text-lg response:text-xl font-thin">
              {installment.months}x de R$ {localeString(priceCalc(installment.monthsAccumulated))}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
