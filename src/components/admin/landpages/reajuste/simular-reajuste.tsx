import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector, UserRoles } from "@/types";
import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import AdminReadjust from "@/components/admin/others/AdminReadjust";
import { MultiValue } from "react-select";

export default function AdminReadjustSimulate() {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Free && value);

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItem, setSelectedItem] = useState<MultiValue<LotesDataInterface> | null>(null);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  return (
    <div className="flex flex-col m-auto py-6 items-center">
      <div className="flex flex-col items-center pb-8">
        <AdminSearchFilters stage={stage} handleStage={handleStage} page={PageSelector.AdminReadjustSimulate} />
        {lotesData && (
          <ProductsSelect
            options={lotesData
              ?.filter((value) => {
                if (stage !== null) {
                  if (stage === value.phase) {
                    return value;
                  }
                } else {
                  return value;
                }
              })
              .sort((a, b) => a.value - b.value)}
            placeholder={"Digite ou Selecione um Lote"}
            onChange={(selection: MultiValue<LotesDataInterface> | null) => setSelectedItem(selection)}
            page={PageSelector.AdminReadjustSimulate}
          />
        )}
      </div>
      <AdminReadjust lote={selectedItem} stage={stage} page={PageSelector.AdminReadjustSimulate} />
    </div>
  );
}
