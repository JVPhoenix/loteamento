import ErrorPage from "@/components/svg/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import Head from "next/head";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import AdminReadjust from "@/components/admin/AdminReadjust";

export default function ReadjustSimulate() {
  const lotesData = useLotesData()?.filter((value) => value.status.situation === LotesStatus.Free && value);
  const { searchAdmin } = useAdminsData();

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);

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
          <title>{searchAdmin?.length !== 0 ? "Simular Reajuste - Lote" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminReadjustSimulate} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
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
                    .filter((lote) => {
                      if (lote.status.situation === LotesStatus.Free) {
                        return lote;
                      }
                    })}
                  placeholder={"DIGITE OU SELECIONE UM LOTE"}
                  selectedItem={selectedItem}
                  onChange={(selection: LotesDataInterface) => setSelectedItem(selection)}
                />
              )}
            </div>
            <AdminReadjust lote={selectedItem} stage={stage} page={PageSelector.AdminReadjustSimulate} />
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminReadjustSimulate} />
      ) : null}
    </div>
  );
}
