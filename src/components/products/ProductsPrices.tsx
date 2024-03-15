import { FilterSelector, LotesDataInterface, PageSelector } from "@/types";

interface ProductsPricesInterface {
  page: PageSelector;
  selectedItem: LotesDataInterface | null;
  phase: FilterSelector | null;
  entrance?: string;
  parcels?: number;
}

export default function ProductsPrices(props: ProductsPricesInterface) {
  const entrance = props.entrance
    ? parseFloat(props.entrance.replace("R$", "").replaceAll(".", "").replace(",", "."))
    : 0;

  const priceCalc = (plan: number | undefined, page?: PageSelector) => {
    if (props.selectedItem && plan) {
      if (page === PageSelector.AdminPersonalizedQuote) {
        return ((props.selectedItem?.price - entrance) / plan).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } else {
        return (props.selectedItem?.price / plan).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-3 text-center text-gray1">
      <p>Dimensões: {props.selectedItem?.size ? props.selectedItem?.size : "Lote não Selecionado"}</p>
      <div className="flex gap-6 flex-col response:flex-row response:gap-16">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-white text-xl">
            {props.page !== PageSelector.AdminPersonalizedQuote ? "Valor A VISTA" : "Valor Inicial do Lote"}
          </h3>
          <p> R$ {priceCalc(1)} </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-white text-xl">
            {props.page !== PageSelector.AdminPersonalizedQuote ? "Valor A PAZO" : "Valor Final do Lote"}
          </h3>
          {props.page !== PageSelector.AdminPersonalizedQuote ? (
            <>
              <p>Entrada de R$ {priceCalc(10)} </p>
              <p>12x de R$ {priceCalc(12)} </p>
              <p>24x de R$ {priceCalc(24)} </p>
              <p>36x de R$ {priceCalc(36)} </p>
              <p>48x de R$ {priceCalc(48)}</p>
              {props.phase !== FilterSelector.Etapa1 && <p>60x de R$ {priceCalc(60)}</p>}
            </>
          ) : (
            <>
              <p> R$ {priceCalc(1, PageSelector.AdminPersonalizedQuote)} </p>
            </>
          )}
        </div>
        {props.page === PageSelector.AdminPersonalizedQuote && (
          <div className="flex flex-col gap-2 items-center">
            <h3 className="font-bold text-white text-xl">Valores finais do Plano</h3>
            <p>
              {props.parcels}x de R$ {priceCalc(props.parcels, PageSelector.AdminPersonalizedQuote)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
// }
