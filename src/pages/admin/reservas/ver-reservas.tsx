import ErrorPage from "@/components/utils/ErrorPage";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { FilterSelector, LotesDataInterface, LotesStatus, PageSelector, UserRoles } from "@/types";
import AdminSearchFilters from "@/components/admin/AdminSearchFilters";
import { useState } from "react";
import ProductsSelect from "@/components/products/ProductsSelect";
import { useLotesData } from "@/context/LotesDataContext";
import { MultiValue } from "react-select";
import AdminReservationsInfos from "@/components/admin/reservation/AdminShowReservationsInfos";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AdminShowReservations() {
  const lotesData = useLotesData().lotesData?.filter((value) => value.situation === LotesStatus.Blocked && value);
  const { user, isLoading } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

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
        <Header page={PageSelector.AdminShowReservations} />
      </div>
      {!isLoading && (
        <>
          {user && (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee)) ? (
            <>
              <div className="flex flex-col m-auto py-6 items-center">
                <div className="flex flex-col items-center pb-5">
                  <AdminSearchFilters
                    stage={stage}
                    handleStage={handleStage}
                    page={PageSelector.AdminShowReservations}
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
                    placeholder={"Digite o Lote ou o Nome do Cliente"}
                    onChange={(selection: MultiValue<LotesDataInterface> | null) => setSelectedItem(selection)}
                    page={PageSelector.AdminShowReservations}
                  />
                </div>
                <AdminReservationsInfos selectedItem={selectedItem} />
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
