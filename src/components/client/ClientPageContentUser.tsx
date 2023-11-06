import { ClientsDataInterface } from "@/types";
import { AdressIcon, BirthIcon, CPFIcon, NameIcon, PhoneIcon } from "../Icons";

interface ClientPageContentUser {
  data: ClientsDataInterface;
}

export default function ClientPageContentUser(props: ClientPageContentUser) {
  return (
    <div className="flex flex-col pb-4 response:gap-1">
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
          <AdressIcon className="" width={50} fill="none" stroke="white" />
        </div>
        <h1 className="response:w-96">
          <b>Endereço: </b>
          {props.data.adress}
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
