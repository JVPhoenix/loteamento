import ErrorPage from "@/components/utils/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import Head from "next/head";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import { MultiValue } from "react-select";
import AdminReservationsInfos from "@/components/admin/reservation/AdminShowReservationsInfos";

export default function AdminShowReservations() {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Blocked && value);
  const { searchAdmin } = useAdminsData();

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItem, setSelectedItem] = useState<MultiValue<LotesDataInterface> | null>(null);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
    if (stage === null) {
      setSelectedItem(null);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>{searchAdmin?.length !== 0 ? "Ver Reservas" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminShowReservations} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto py-6 items-center">
            <div className="flex flex-col items-center pb-5">
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
            </div>
            <AdminReservationsInfos selectedItem={selectedItem} />
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminReadjustSimulate} />
      ) : null}
    </div>
  );
}
