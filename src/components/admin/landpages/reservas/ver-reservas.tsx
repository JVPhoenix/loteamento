import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import React, { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import AdminReservationsInfos from "@/components/admin/reservation/AdminShowReservationsInfos";

export default function AdminShowReservations() {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Blocked);

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItemsArray, setSelectedItemsArray] = useState<LotesDataInterface[]>([]);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  return (
    <React.Fragment>
      <AdminSearchFilters stage={stage} handleStage={handleStage} page={PageSelector.AdminShowReservations} />
      <ProductsSelect
        allOptions={lotesData}
        stage={stage}
        placeholder="Selecione a Reserva"
        selectedItems={selectedItemsArray}
        onChange={setSelectedItemsArray}
        page={PageSelector.AdminShowReservations}
      />

      <AdminReservationsInfos selectedItem={selectedItemsArray} />
    </React.Fragment>
  );
}
