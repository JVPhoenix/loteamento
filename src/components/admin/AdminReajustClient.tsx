import { ClientsDataInterface, PlanMonths } from "@/types";
import { PlanIcon } from "../svg/Icons";

interface AdminReajustInterface {
  data: ClientsDataInterface | null;
}

export default function AdminReajustClient(props: AdminReajustInterface) {
  const plan = props.data?.plan ? props.data?.plan : 0;
  const localeString = (value: number) => {
    return value.toLocaleString("pt-br", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const priceCalc = (year: number) => {
    const firstYear = props.data?.price ? props.data.price / props.data?.plan : 0;
    const debtFirstYear = props.data?.price ? props.data.price - firstYear * 12 : 0;

    const secondYear = debtFirstYear + debtFirstYear * 0.05;
    const debtSecondYear = secondYear - (secondYear / (plan - 12)) * 12;

    const thirdYear = debtSecondYear + debtSecondYear * 0.05;
    const debtThirdYear = thirdYear - (thirdYear / (plan - 24)) * 12;

    const FourthYear = debtThirdYear + debtThirdYear * 0.05;
    const debtFourthYear = FourthYear - (FourthYear / (plan - 36)) * 12;

    const FifthYear = debtFourthYear + debtFourthYear * 0.05;

    if (year === PlanMonths.FirstYear && plan >= PlanMonths.FirstYear) {
      return firstYear;
    } else if (year === PlanMonths.SecondYear && plan >= PlanMonths.SecondYear) {
      return secondYear / (plan - 12);
    } else if (year === PlanMonths.ThirdYear && plan >= PlanMonths.ThirdYear) {
      return thirdYear / (plan - 24);
    } else if (year === PlanMonths.FourthYear && plan >= PlanMonths.FourthYear) {
      return FourthYear / (plan - 36);
    } else if (year === PlanMonths.FifthYear && plan >= PlanMonths.FifthYear) {
      return FifthYear / (plan - 48);
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col m-auto w-full items-center gap-4">
      <h1 className="text-white drop-shadow-titles text-xl response:text-2xl font-bold select-none">
        Reaustes para o Plano de {plan / 12} anos
      </h1>
      {!props.data?.standard && (
        <h1 className="text-white text-lg response:text-xl font-bold select-none">
          OBS: Clientes Especiais podem conter erros.
        </h1>
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
        {plan === 60 && (
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
