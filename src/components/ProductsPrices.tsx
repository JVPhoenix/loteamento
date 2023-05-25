import { LotesDataInterface } from "@/data/lotesData1";

interface ProductsPricesInterface {
  selectedItem: LotesDataInterface | null;
}

export default function ProductsPrices(props: ProductsPricesInterface) {
  const priceCalc = (quota: number) => {
    if (props.selectedItem) {
      return (props.selectedItem?.price / quota).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return 0;
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
      <p>Dimensões: {props.selectedItem?.size ? props.selectedItem?.size : "Lote não Selecionado"}</p>
      <div className="flex gap-8 response:gap-16">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-slate-200 text-xl">Valor A VISTA</h3>
          <p> R$ {priceCalc(1)} </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-slate-200 text-xl">Valor A PRAZO</h3>
          <p>Entrada de R$ {priceCalc(10)} </p>
          <p>12x de R$ {priceCalc(12)} </p>
          <p>24x de R$ {priceCalc(24)} </p>
          <p>36x de R$ {priceCalc(36)} </p>
          <p>48x de R$ {priceCalc(48)}</p>
        </div>
      </div>
    </div>
  );
}
