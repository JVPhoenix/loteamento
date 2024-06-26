import { ClientsDataInterface } from "@/types";
import { AddressIcon, BirthIcon, CPFIcon, NameIcon, PhoneIcon } from "../utils/Icons";

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
    </div>
  );
}
