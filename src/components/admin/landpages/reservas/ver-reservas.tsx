import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import React, { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import { MultiValue } from "react-select";
import AdminReservationsInfos from "@/components/admin/reservation/AdminShowReservationsInfos";

interface AdminShowReservationsInterface {
  checkRoles: (role: string) => boolean | undefined;
}

export default function AdminShowReservations({ checkRoles }: AdminShowReservationsInterface) {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Blocked && value);

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItem, setSelectedItem] = useState<MultiValue<LotesDataInterface> | null>(null);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
    if (stage === null) {
      setSelectedItem(null);
    }
  };

  return (
    <React.Fragment>
      <AdminSearchFilters stage={stage} handleStage={handleStage} page={PageSelector.AdminShowReservations} />
      <ProductsSelect
        options={lotesData?.filter((value) => {
          if (stage !== null) {
            if (stage === value.phase) {
              return value;
            }
          } else {
            return value;
          }
        })}
        placeholder={"Digite o Lote ou o Nome do Cliente"}
        onChange={(selection: MultiValue<LotesDataInterface> | null) => setSelectedItem(selection)}
        page={PageSelector.AdminShowReservations}
      />
      <AdminReservationsInfos selectedItem={selectedItem} />
    </React.Fragment>
  );
}
