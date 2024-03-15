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
import ProductsPrices from "@/components/products/ProductsPrices";
import { twMerge } from "tailwind-merge";

export default function PersonalizedQuotes() {
  const lotesData = useLotesData()?.filter((value) => value.status.situation === LotesStatus.Free && value);
  const { searchAdmin } = useAdminsData();

  const [stage, setStage] = useState<FilterSelector | null>(null);

  const [selectedItem, setSelectedItem] = useState<LotesDataInterface | null>(null);
  const [entranceValue, setEntranceValue] = useState<string>("");
  const [parcelsValue, setParcelsValue] = useState<number>(0);

  const [checkParcels, setCheckParcels] = useState<boolean>(false);
  const [checkEntrance, setcheckEntrance] = useState<boolean>(false);

  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
    if (stage === null) {
      setSelectedItem(null);
    }
  };

  const handleCurrencyMask = (rawValue: string) => {
    const convertedValue = rawValue
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".")
      .replace(/^0/, "");

    console.log(convertedValue);

    if (convertedValue !== "") {
      setEntranceValue("R$ " + convertedValue);
      setcheckEntrance(false);
    } else if (convertedValue === "") {
      setEntranceValue("");
      setcheckEntrance(true);
    }
  };

  const handleParcelsMask = (rawInput: string) => {
    const parcels = parseFloat(rawInput);
    if (parcels >= 1 && parcels <= 60) {
      setParcelsValue(parcels);
      setCheckParcels(false);
    } else if (rawInput === "") {
      setParcelsValue(0);
      setCheckParcels(false);
    } else {
      setCheckParcels(true);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>{searchAdmin?.length !== 0 ? "Orçamento Personalizado" : "ERRO - Sem Acesso"}</title>
        </Head>
        <Header page={PageSelector.AdminPersonalizedQuote} />
      </div>
      {searchAdmin?.length === 1 ? (
        <>
          <div className="flex flex-col m-auto py-6 items-center">
            <div className="flex flex-col items-center pb-5">
              <AdminSearchFilters stage={stage} handleStage={handleStage} page={PageSelector.AdminPersonalizedQuote} />
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
                placeholder={"Digite ou Selecione um Lote"}
                onChange={(selection: LotesDataInterface | null) => setSelectedItem(selection)}
                page={PageSelector.AdminPersonalizedQuote}
              />
            </div>
            <div className="flex flex-col response:flex-row gap-8 mb-2">
              <div className="flex flex-col items-center">
                <h1 className="text-white text-xl response:text-2xl font-bold select-none mb-2">Valor da Entrada</h1>
                <input
                  type="text"
                  value={entranceValue}
                  onChange={(e) => handleCurrencyMask(e.target.value)}
                  placeholder="Valor da entrada"
                  className={twMerge(
                    "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
                    "hover:scale-110 focus:scale-110 ease-in-out duration-100",
                    checkEntrance && "border-red-500"
                  )}
                />
                <b className={twMerge("invisible text-red-500 text-sm pt-2", checkEntrance && "visible animate-pulse")}>
                  Valor inválido!
                </b>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-white text-xl response:text-2xl font-bold select-none mb-2">Número de Parcelas</h1>
                <input
                  type="number"
                  onChange={(e) => handleParcelsMask(e.target.value)}
                  placeholder="Quantidade de Parcelas"
                  className={twMerge(
                    "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
                    "hover:scale-110 focus:scale-110 ease-in-out duration-100",
                    checkParcels && "border-red-500"
                  )}
                />
                <b className={twMerge("invisible text-red-500 text-sm pt-2", checkParcels && "visible animate-pulse")}>
                  Valor inválido!
                </b>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS DO LOTE</h1>
              <h1 className="font-bold">Localizado na {selectedItem?.phase ? selectedItem.phase : "X"}ª Etapa</h1>
              <ProductsPrices
                selectedItem={selectedItem}
                phase={selectedItem?.phase ? selectedItem.phase : stage}
                page={PageSelector.AdminPersonalizedQuote}
                entrance={entranceValue}
                parcels={parcelsValue}
              />
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
