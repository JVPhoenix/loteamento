import { ClientsDataInterface } from "@/types";
import { AddressIcon, BirthIcon, CPFIcon, DigitalContractIcon, NameIcon, PhoneIcon } from "../utils/Icons";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ClientPageContentUser {
  data: ClientsDataInterface;
}

export default function ClientPageContentUser(props: ClientPageContentUser) {
  return (
    <div className="flex flex-col py-4 gap-1">
      <div className="flex leading-tight items-center gap-1">
        <div>
          <NameIcon className="" width={50} fill="none" stroke="white" />
        </div>
        <h1>
          <b>Nome: </b>
          {props.data.name}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1">
        <div>
          <CPFIcon className="" width={50} fill="none" stroke="white" />
        </div>
        <h1>
          <b>CPF: </b>
          {props.data.cpf}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1">
        <div>
          <BirthIcon className="" width={50} fill="none" stroke="white" />
        </div>
        <h1>
          <b>Data de Nascimento: </b>
          {props.data.birth}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1">
        <div>
          <AddressIcon className="" width={50} fill="none" stroke="white" />
        </div>
        <h1 className="max-w-md response:max-w-xl">
          <b>Endereço: </b>
          {props.data.address}
        </h1>
      </div>
      <div className="flex leading-tight items-center gap-1">
        <div>
          <PhoneIcon className="" width={50} fill="none" stroke="white" />
        </div>
        <h1>
          <b>Telefone: </b>
          {props.data.phone}
        </h1>
      </div>
      <Link
        href={props.data.digitalContract}
        className={twMerge(
          "flex leading-tight items-center gap-1 group",
          "ease-in-out duration-200 active:duration-100 hover:scale-105 response:hover:scale-110 active:scale-90 hover:text-yellow1"
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <DigitalContractIcon
            className="p-1 ml-1 group-hover:fill-yellow1 ease-in-out duration-200"
            width={50}
            fill="white"
            stroke=""
          />
        </div>
        <h1>
          <b>Versão Digital do Contrato</b>
        </h1>
      </Link>
    </div>
  );
}
