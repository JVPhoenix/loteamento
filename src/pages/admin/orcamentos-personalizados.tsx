import ErrorPage from "@/components/utils/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector } from "@/types";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import ProductsPrices from "@/components/products/ProductsPrices";
import { twMerge } from "tailwind-merge";
import { MultiValue } from "react-select";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function PersonalizedQuotes() {
  const { user, isLoading } = useUser();
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Free && value);

  const [stage, setStage] = useState<FilterSelector | null>(null);

  const [selectedItem, setSelectedItem] = useState<MultiValue<LotesDataInterface> | null>(null);
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
        <Header page={PageSelector.AdminPersonalizedQuote} />
      </div>
      {!isLoading && (
        <>
          {user ? (
            <>
              <div className="flex flex-col m-auto py-6 items-center">
                <div className="flex flex-col items-center pb-5">
                  <AdminSearchFilters
                    stage={stage}
                    handleStage={handleStage}
                    page={PageSelector.AdminPersonalizedQuote}
                  />
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
                    onChange={(selection: MultiValue<LotesDataInterface> | null) => setSelectedItem(selection)}
                    page={PageSelector.AdminPersonalizedQuote}
                  />
                </div>
                <div className="flex flex-col response:flex-row response:gap-8 mb-2">
                  <div className="flex flex-col items-center">
                    <h1 className="text-white text-xl response:text-2xl font-bold select-none mb-2">
                      Valor da Entrada
                    </h1>
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
                    <b
                      className={twMerge(
                        "invisible text-red-500 text-sm pt-2",
                        checkEntrance && "visible animate-pulse"
                      )}
                    >
                      Valor inválido!
                    </b>
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-white text-xl response:text-2xl font-bold select-none mb-2">
                      Número de Parcelas
                    </h1>
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
                    <b
                      className={twMerge(
                        "invisible text-red-500 text-sm pt-2",
                        checkParcels && "visible animate-pulse"
                      )}
                    >
                      Valor inválido!
                    </b>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <h1 className="text-green-600 text-xl response:text-2xl font-bold ">DADOS FINAIS DO ORÇAMENTO</h1>
                  <h1 className="font-bold">
                    Localizado na{" "}
                    {selectedItem?.length
                      ? selectedItem
                          .map((value) => value.phase + "ª Etapa")
                          .filter((value, index, array) => {
                            return array.indexOf(value) === index;
                          })
                          .join(" e ")
                      : "X Etapa"}
                  </h1>
                  <ProductsPrices
                    selectedItem={selectedItem}
                    phase={selectedItem?.map((value) => value.phase).includes(2) ? 2 : 1}
                    page={PageSelector.AdminPersonalizedQuote}
                    entrance={entranceValue}
                    parcels={parcelsValue}
                  />
                </div>
              </div>
              <Footer />
            </>
          ) : (
            <ErrorPage page={PageSelector.AdminReadjustSimulate} />
          )}
        </>
      )}
    </div>
  );
}
