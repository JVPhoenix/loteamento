import { useLotesData } from "@/context/LotesDataContext";
import ProductsPhases from "./ProductsPhases";
import { usePhotosData } from "@/context/PhotosDataContext";

export default function Products() {
  const lotesData = useLotesData();
  const photosData = usePhotosData();

  return (
    <div className="flex flex-col gap-4 text-gray1 font-medium text-center items-center mb-8">
      {lotesData && <ProductsPhases data={lotesData && lotesData[1]} showcase={photosData?.showcase[1]} phase={2} />}
      {lotesData && <ProductsPhases data={lotesData[0]} showcase={photosData?.showcase[0]} phase={1} />}
    </div>
  );
}
