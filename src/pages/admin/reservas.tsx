import ErrorPage from "@/components/svg/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { FilterSelector, InnerLotesInterface, LotesStatus, PageSelector } from "@/types";
import Head from "next/head";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import AdminReadjust from "@/components/admin/AdminReadjust";
import ProductsPrices from "@/components/products/ProductsPrices";

export default function ReadjustSimulate() {
  const lotesData = useLotesData();
  const { searchAdmin } = useAdminsData();

  const [stage, setStage] = useState<FilterSelector | null>(null);
  const [selectedItem, setSelectedItem] = useState<InnerLotesInterface | null>(null);

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
          <title>{searchAdmin?.length !== 0 ? "Reservas" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminReservations} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto py-6 items-center">
            <div className="flex flex-col items-center pb-5">
              <AdminSearchFilters stage={stage} handleStage={handleStage} page={PageSelector.AdminReservations} />
              {lotesData && (
                <ProductsSelect
                  options={lotesData[stage === null ? 0 : stage].filter((lote) => {
                    if (lote.status.situation === LotesStatus.Blocked) {
                      return lote;
                    }
                  })}
                  placeholder={"Digite o Lote ou o Nome do Cliente"}
                  selectedItem={selectedItem}
                  onChange={(selection: InnerLotesInterface) => setSelectedItem(selection)}
                />
              )}
            </div>

            <div className="flex flex-col gap-3 items-center p-4">
              <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS DA RESERVA</h1>
              <div className="flex leading-tight items-center gap-1">
                <h1>
                  <b>Reservado por: </b>
                  {selectedItem?.status.admin === undefined ? "Não Informado" : selectedItem?.status.admin}
                </h1>
              </div>
              <div className="flex leading-tight items-center gap-1">
                <h1>
                  <b>Nome do Interessado: </b>
                  {selectedItem?.status.client === undefined ? "Não Informado" : selectedItem?.status.client}
                </h1>
              </div>
              <div className="flex leading-tight items-center gap-1">
                <h1>
                  <b>Contato do Cliente: </b>
                  {selectedItem?.status.contact === undefined ? "Não Informado" : selectedItem?.status.contact}
                </h1>
              </div>
              <div className="flex leading-tight items-center gap-1">
                <h1>
                  <b>Data da Reserva: </b>
                  {selectedItem?.status.date === undefined ? "Não Informado" : selectedItem?.status.date}
                </h1>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS DO LOTE</h1>
              <ProductsPrices selectedItem={selectedItem} phase={stage} />
            </div>
          </div>
          <Footer />
        </>
      ) : searchAdmin?.length === 0 ? (
        <ErrorPage page={PageSelector.AdminReadjustSimulate} />
      ) : null}
    </div>
  );
}
