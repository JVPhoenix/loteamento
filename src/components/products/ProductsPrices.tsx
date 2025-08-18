import { FilterSelector, LotesDataInterface, PageSelector } from "@/types";

interface ProductsPricesInterface {
  page: PageSelector;
  selectedItemsData: LotesDataInterface[] | null;
  phase: FilterSelector | null;
  entrance?: string;
  parcels?: number;
  discount?: boolean;
}

export default function ProductsPrices(props: ProductsPricesInterface) {
  const entrance = props.entrance
    ? parseFloat(props.entrance.replace("R$", "").replaceAll(".", "").replace(",", "."))
    : 0;

  const price = props.selectedItemsData
    ? props.selectedItemsData.reduce((accumulator, value) => (accumulator = accumulator + value.price), 0)
    : 0;

  const priceCalc = (plan: number | undefined, page?: PageSelector) => {
    if (props.selectedItemsData && plan) {
      if (page === PageSelector.AdminPersonalizedQuote) {
        return ((props.discount ? price - entrance : price + price / 10 - entrance) / plan).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } else {
        return (price / plan).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className="flex flex-col flex-wrap max-w-md gap-3 mt-3 mx-2 text-center text-gray1">
        <h1>
          Dimensões:{" "}
          {props.selectedItemsData?.length ? props.selectedItemsData.map((value) => value.size).join(", ") : "Não Selecionado"}
        </h1>
      </div>

      <div className="flex flex-col gap-3 mt-3 text-center text-gray1">
        <div className="flex gap-6 flex-col response:flex-row response:gap-16">
          <div className="flex flex-col gap-2">
            {props.page !== PageSelector.AdminPersonalizedQuote ? (
              <>
                <h3 className="font-bold text-white text-xl">Valor A VISTA</h3>
                <p> R$ {priceCalc(1)} </p>
              </>
            ) : (
              <>
                <h3 className="font-bold text-white text-xl">Valor Inicial do Lote - A Prazo</h3>
                <p>
                  R${" "}
                  {(props.discount ? price : price + price / 10).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {props.page !== PageSelector.AdminPersonalizedQuote ? (
              <>
                <h3 className="font-bold text-white text-xl">Valor A PRAZO</h3>
                <p>Entrada de R$ {priceCalc(10)} </p>
                <p>12x de R$ {priceCalc(12)} </p>
                <p>24x de R$ {priceCalc(24)} </p>
                <p>36x de R$ {priceCalc(36)} </p>
                <p>48x de R$ {priceCalc(48)} </p>
                {props.phase !== FilterSelector.Etapa1 && <p>60x de R$ {priceCalc(60)}</p>}
              </>
            ) : (
              <>
                <h3 className="font-bold text-white text-xl">Valor Final do Lote</h3>
                <p> R$ {priceCalc(1, PageSelector.AdminPersonalizedQuote)} </p>
              </>
            )}
          </div>

          {props.page === PageSelector.AdminPersonalizedQuote && (
            <div className="flex flex-col gap-2 items-center">
              <h3 className="font-bold text-white text-xl">Parcelas do Plano</h3>
              <p>
                {props.parcels}x de R$ {priceCalc(props.parcels, PageSelector.AdminPersonalizedQuote)}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
// }
