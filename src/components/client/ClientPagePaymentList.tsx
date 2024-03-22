import { useState } from "react";
import { Button } from "../utils/Button";
import { twMerge } from "tailwind-merge";
import { PageSelector } from "@/types";

interface ClientPagePaymentListInterface {
  paymentList: string[];
  keyData: string;
  page: PageSelector;
}

export default function ClientPagePaymentList(props: ClientPagePaymentListInterface) {
  const [showPaymentList, setShowPaymentList] = useState<boolean>(
    props.page === PageSelector.ClientSearch ? false : true
  );

  const showList = () => {
    for (let index = 0; index < props.paymentList.length; index++) {
      return (
        <>
          <div
            className={twMerge(
              "flex flex-col flex-wrap gap-4 response:max-h-[600px] w-full items-center p-4",
              "border border-yellow1 rounded-lg"
            )}
          >
            {props.paymentList.map((value) => (
              <div key={props.keyData + index}>
                {value === "" ? "Nenhuma parcela foi paga!" : index++ + 1 + " → " + value}
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Button className="mb-8 w-fit" onClick={() => setShowPaymentList((prevState) => !prevState)}>
        <h1> {showPaymentList ? "Ocultar" : "Mostrar"} lista de pagamentos </h1>
      </Button>
      {showPaymentList && showList()}
    </>
  );
}
