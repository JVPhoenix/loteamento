import { lotesData1, lotesData2 } from "@/data/lotesData";
import ProductsPhases from "./ProductsPhases";
import { photosShowcase1, photosShowcase2 } from "@/data/photosData";

export default function Products() {

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      <ProductsPhases data={lotesData2} showcase={photosShowcase2} phase={2}/>
      <ProductsPhases data={lotesData1} showcase={photosShowcase1} phase={1}/>
    </div>
  );
}
