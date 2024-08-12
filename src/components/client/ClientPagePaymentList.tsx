import { useState } from "react";
import { Button } from "../utils/Button";
import { twMerge } from "tailwind-merge";
import { Methods, PageSelector, UserRoles } from "@/types";
import { AddIcon, DeleteIcon, EditIcon } from "../utils/Icons";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ClientPagePaymentListInterface {
  paymentList: string[];
  keyData: string;
  page: PageSelector;
  handleActionType?: (newState: Methods, refId: string, index?: number) => void;
}

export default function ClientPagePaymentList(props: ClientPagePaymentListInterface) {
  const { user } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  const [showPaymentList, setShowPaymentList] = useState<boolean>(
    props.page === PageSelector.ClientSearch ? false : true
  );

  const showList = () => {
    return (
      <>
        <div
          className={twMerge(
            "flex flex-col flex-wrap gap-4 response:max-h-[580px] w-full items-center p-4",
            "border border-yellow1 rounded-lg"
          )}
        >
          {props.paymentList.map((value, index) => (
            <div className="flex gap-5 group" key={props.keyData + index}>
              <h1>{value === "" ? "Nenhuma parcela foi paga!" : index + 1 + " → " + value}</h1>
              {props.page !== PageSelector.ClientSearch && value !== "" && checkRoles(UserRoles.Admins) && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 ease-in-out duration-100">
                  <DeleteIcon
                    className="hover:fill-red-500 hover:scale-125 ease-in-out duration-200 active:scale-95 select-none cursor-pointer"
                    fill="white"
                    width={20}
                    onClick={() =>
                      props.handleActionType && props.handleActionType(Methods.Payment_DELETE, "DeleteConfirm", index)
                    }
                  />
                  <EditIcon
                    className="hover:fill-blue-500 hover:scale-125 ease-in-out duration-200 active:scale-95 select-none cursor-pointer"
                    fill="white"
                    width={20}
                    onClick={() =>
                      props.handleActionType && props.handleActionType(Methods.Payment_EDIT, "DateCenter", index)
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <Button className="mb-5 w-fit" onClick={() => setShowPaymentList((prevState) => !prevState)}>
        <h1> {showPaymentList ? "Ocultar" : "Mostrar"} lista de pagamentos </h1>
      </Button>
      {showPaymentList && (
        <>
          {showList()}
          {props.page === PageSelector.AdminSearch &&
            (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Employee)) && (
              <Button
                className="flex items-center gap-2 leading-tight group mt-5"
                onClick={() => props.handleActionType && props.handleActionType(Methods.Payment_NEW, "DateCenter")}
              >
                <div>
                  <AddIcon
                    className="fill-white group-hover:fill-[#FACC15] ease-in-out duration-200"
                    width={30}
                    stroke="none"
                  />
                </div>
                <h1 className="text-justify max-w-md">
                  <b>Adicionar Pagamento</b>
                </h1>
              </Button>
            )}
        </>
      )}
    </>
  );
}
