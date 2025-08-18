import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import AdminReadjust from "@/components/admin/others/AdminReadjust";

export default function AdminReadjustSimulate() {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Free && value);

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItem, setSelectedItem] = useState<LotesDataInterface[] | null>(null);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  return (
    <div className="flex flex-col m-auto py-6 items-center">
      <div className="flex flex-col items-center pb-8">
        <AdminSearchFilters stage={stage} handleStage={handleStage} page={PageSelector.AdminReadjustSimulate} />
        {lotesData && (
          <ProductsSelect
            allOptions={lotesData}
            selectedItems={selectedItem}
            stage={stage}
            placeholder={"Digite ou Selecione um Lote"}
            onChange={setSelectedItem}
            page={PageSelector.AdminReadjustSimulate}
          />
        )}
      </div>
      <AdminReadjust lote={selectedItem} stage={stage} page={PageSelector.AdminReadjustSimulate} />
    </div>
  );
}
