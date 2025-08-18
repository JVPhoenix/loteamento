import { ClientsDataInterface, FilterSelector, PageSelector } from "@/types";
import AdminSearchFilters from "@/components/admin/others/AdminSearchFilters";
import AdminSearchSelect from "@/components/admin/others/AdminSearchSelect";
import { useState } from "react";
import { useClientsData } from "@/context/ClientsDataContext";
import AdminReadjust from "@/components/admin/others/AdminReadjust";

export default function AdminReadjustClient() {
  const { clientsData } = useClientsData();

  const [selectedClient, setSelectedClient] = useState<ClientsDataInterface | null>(null);
  const [state, setState] = useState<FilterSelector | null>(null);
  const [stage, setStage] = useState<FilterSelector | null>(null);

  const handleState = (newState: FilterSelector) => {
    setState((state) => (state === newState ? null : newState));
  };
  const handleStage = (newStage: FilterSelector) => {
    setStage((state) => (state === newStage ? null : newStage));
  };

  return (
    <div className="flex flex-col m-auto py-6 items-center">
      <div className="flex flex-col items-center pb-10">
        <AdminSearchFilters
          state={state}
          handleState={handleState}
          stage={stage}
          handleStage={handleStage}
          page={PageSelector.AdminReadjustClient}
        />
        <AdminSearchSelect
          options={clientsData}
          placeholder="Digite o Nome do Cliente ou Quadra e Lote"
          setSelectedClient={setSelectedClient}
          state={state}
          stage={stage}
          page={PageSelector.AdminReadjustClient}
        />
      </div>
      <AdminReadjust client={selectedClient} page={PageSelector.AdminReadjustClient} />
    </div>
  );
}
