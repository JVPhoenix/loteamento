import { ClientsDataInterface, FilterSelector, PageSelector } from "@/types";
import Select from "react-select";

interface SelectClientProps {
  options: ClientsDataInterface[] | null;
  page: PageSelector;
  placeholder?: string;
  setSelectedClient: (selection: ClientsDataInterface | null) => void;
  state: FilterSelector | null;
  special?: boolean;
  stage: FilterSelector | null;
}

export default function AdminSearchSelectBox(props: SelectClientProps) {
  const checkExpired = (paymentList: Array<string>, startDate: string, returnType: FilterSelector) => {
    const today = new Date();
    const start = new Date(startDate.split("-").reverse().join("-"));

    const last = new Date(
      new Date(startDate.split("-").reverse().join("-")).setMonth(
        new Date(startDate.split("-").reverse().join("-")).getMonth() + paymentList.length
      )
    );

    const expireDate = new Date(startDate.split("-").reverse().join("-"));
    const paidParcels = last.getMonth() - start.getMonth() + 12 * (last.getFullYear() - start.getFullYear());

    expireDate.setMonth(
      expireDate.getMonth() + last.getMonth() - start.getMonth() + 12 * (last.getFullYear() - start.getFullYear()) + 1
    ); // set 1 moth later (30 days)
    expireDate.setDate(expireDate.getDate() + 1); // set +1 day (to set the same day every month)

    if (returnType === FilterSelector.Expired || returnType === FilterSelector.Regular) {
      return today < expireDate ? FilterSelector.Regular : FilterSelector.Expired;
    } else if (returnType === FilterSelector.PaidOff) {
      return paidParcels;
    } else {
      return 0;
    }
  };

  const customSearchFilter = (option: ClientsDataInterface, searchItem: string) => {
    if (
      option.name
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .indexOf(
          searchItem
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) >= 0 ||
      option.lote.replace(/ - /, " ").toLocaleLowerCase().indexOf(searchItem.replace(/ - /, " ").toLocaleLowerCase()) >=
        0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Select
      //CUSTOM OPTIONS
      placeholder={props.placeholder}
      onChange={(option: ClientsDataInterface | null) => props.setSelectedClient(option)}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.contractNumber}
      filterOption={(e, input) => customSearchFilter(e.data, input)}
      //CUSTOM STYLES
      className={"w-[380px] response:w-[500px] select-none z-10"}
      styles={{
        control: (controlStyles, state) => ({
          ...controlStyles,
          color: "black",
          textAlign: "center",
          display: "flex",
          ":hover": {
            scale: window.innerWidth <= 1080 ? "105%" : "110%",
          },
          scale: window.innerWidth <= 1080 ? (state.isFocused ? "105%" : "100%") : state.isFocused ? "110%" : "100%",
        }),
        option: (optionStyles) => ({
          ...optionStyles,
          color: "black",
          textAlign: "center",
        }),
        placeholder: (placeholderStyles) => {
          return {
            ...placeholderStyles,
            color: "#00000",
            marginLeft: window.innerWidth <= 1080 ? 0 : 2,
            marginRight: window.innerWidth <= 1080 ? 0 : 2,
            fontSize: window.innerWidth <= 1080 ? 16 : 18,
          };
        },
      }}
      //DATA OPTIONS FILTERS
      options={props.options
        ?.filter((option) => {
          if (props.page === PageSelector.AdminReadjustClient) {
            return (
              option.standard &&
              option.plan !== 0 &&
              (
                option.price -
                (checkExpired(option.paymentList, option.startDate, FilterSelector.PaidOff) * option.price) /
                  option.plan
              ).toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) !== "0,00" &&
              option.standard
            );
          } else {
            return option;
          }
        })
        .filter((option) => {
          return (
            // STAGE FILTER
            (!props.stage || option.phase === props.stage) &&
            // SPECIAL FILTER
            (!props.special || option.standard === false) &&
            // REGULAR FILTER
            (props.state !== FilterSelector.Regular ||
              checkExpired(option.paymentList, option.startDate, FilterSelector.Regular) !== FilterSelector.Expired) &&
            // EXPIRED FILTER
            (props.state !== FilterSelector.Expired ||
              (checkExpired(option.paymentList, option.startDate, FilterSelector.Expired) !== FilterSelector.Regular &&
                option.plan !== 0 &&
                (
                  option.price -
                  (checkExpired(option.paymentList, option.startDate, FilterSelector.PaidOff) * option.price) /
                    option.plan
                ).toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) !== "0,00")) &&
            // PAIDOFF FILTER
            (props.state !== FilterSelector.PaidOff ||
              ((
                option.price -
                (checkExpired(option.paymentList, option.startDate, FilterSelector.PaidOff) * option.price) /
                  option.plan
              ).toLocaleString("pt-br", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) === "0,00" &&
                option.standard) ||
              option.plan === 0)
          );
        })}
    />
  );
}
