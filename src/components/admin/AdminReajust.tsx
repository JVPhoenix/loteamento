import { ClientsDataInterface, InnerLotesInterface, PageSelector, PlanMonths } from "@/types";
import { PlanIcon } from "../svg/Icons";
import { useState } from "react";

interface AdminReajustInterface {
  client?: ClientsDataInterface | null;
  lote?: InnerLotesInterface | null;
  page: PageSelector;
}

export default function AdminReajustClient(props: AdminReajustInterface) {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const plan = () => {
    if (props.page === PageSelector.AdminReajustClient) {
      return props.client ? props.client?.plan : 0;
    } else if (props.page === PageSelector.AdminReajustSimulate) {
      return selectedPlan;
    } else {
      return 0;
    }
  };

  const price = () => {
    if (props.page === PageSelector.AdminReajustClient) {
      return props.client ? props.client?.price : 0;
    } else if (props.page === PageSelector.AdminReajustSimulate) {
      return props.lote ? props.lote.price : 0;
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

    if (year === PlanMonths.FirstYear && plan() >= PlanMonths.FirstYear) {
      return firstYear;
    } else if (year === PlanMonths.SecondYear && plan() >= PlanMonths.SecondYear) {
      return secondYear / (plan() - 12);
    } else if (year === PlanMonths.ThirdYear && plan() >= PlanMonths.ThirdYear) {
      return thirdYear / (plan() - 24);
    } else if (year === PlanMonths.FourthYear && plan() >= PlanMonths.FourthYear) {
      return FourthYear / (plan() - 36);
    } else if (year === PlanMonths.FifthYear && plan() >= PlanMonths.FifthYear) {
      return FifthYear / (plan() - 48);
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col m-auto w-full items-center gap-4">
      <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none">
        {props.page === PageSelector.AdminReajustClient
          ? `Reaustes para o Plano de ${plan() / 12} anos`
          : "Selecione o plano"}
      </h1>
      {props.page === PageSelector.AdminReajustSimulate && (
        <select
          onChange={(e) => setSelectedPlan(Number(e.target.value))}
          className="rounded-lg text-black p-2 border-4 border-white"
        >
          <option value={0}>Selecione o Plano</option>
          <option value={12}>1 ano (12 meses)</option>
          <option value={24}>2 anos (24 meses)</option>
          <option value={36}>3 anos (36 meses)</option>
          <option value={48}>4 anos (48 meses)</option>
          <option value={60}>5 anos (60 meses)</option>
        </select>
      )}
      <div className="flex flex-col gap-4 text-center">
        <div className="flex items-center gap-2">
          <PlanIcon className="" width={40} plan={12} fill="white" />
          <h1 className="text-white text-lg response:text-xl font-bold select-none">Primeiro Ano:</h1>
          <h1 className="text-white text-lg response:text-xl font-thin select-none">
            12x de R$ {localeString(priceCalc(PlanMonths.FirstYear))}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <PlanIcon className="" width={40} plan={24} fill="white" />
          <h1 className="text-white text-lg response:text-xl font-bold select-none">Segundo Ano:</h1>
          <h1 className="text-white text-lg response:text-xl font-thin select-none">
            12x de R$ {localeString(priceCalc(PlanMonths.SecondYear))}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <PlanIcon className="" width={40} plan={36} fill="white" />
          <h1 className="text-white text-lg response:text-xl font-bold select-none">Terceiro Ano:</h1>
          <h1 className="text-white text-lg response:text-xl font-thin select-none">
            12x de R$ {localeString(priceCalc(PlanMonths.ThirdYear))}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <PlanIcon className="" width={40} plan={48} fill="white" />
          <h1 className="text-white text-lg response:text-xl font-bold select-none">Quarto Ano:</h1>
          <h1 className="text-white text-lg response:text-xl font-thin select-none">
            12x de R$ {localeString(priceCalc(PlanMonths.FourthYear))}
          </h1>
        </div>
        {plan() === 60 && (
          <div className="flex items-center gap-2">
            <PlanIcon className="" width={40} plan={60} fill="white" />
            <h1 className="text-white text-lg response:text-xl font-bold select-none">Quinto Ano:</h1>
            <h1 className="text-white text-lg response:text-xl font-thin select-none">
              12x de R$ {localeString(priceCalc(PlanMonths.FifthYear))}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
