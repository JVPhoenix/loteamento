import { LotesDataInterface } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../utils/Button";
import { MultiValue } from "react-select";

interface AdminNewClientInfosInterface {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;

  standardPrice: boolean;
  setPriceStandard: Dispatch<SetStateAction<boolean>>;
  differentPrice: string;
  setDifferentPrice: Dispatch<SetStateAction<string>>;

  name: string | undefined;
  setName: Dispatch<SetStateAction<string | undefined>>;
  cpf: string;
  setCpf: Dispatch<SetStateAction<string>>;
  birth: string;
  setBirth: Dispatch<SetStateAction<string>>;
  phone: string | undefined;
  setPhone: Dispatch<SetStateAction<string | undefined>>;
  digitalContract: string;
  setDigitalContract: Dispatch<SetStateAction<string>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  plan: number;
  setPlan: Dispatch<SetStateAction<number>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  entrance: string;
  setEntrance: Dispatch<SetStateAction<string>>;
  standardEntrance: boolean;
  setStandardEntrance: Dispatch<SetStateAction<boolean>>;
  contractNumber: string;
  setContractNumber: Dispatch<SetStateAction<string>>;
  standard: boolean;
  setStandard: Dispatch<SetStateAction<boolean>>;
  setObs: Dispatch<SetStateAction<string | null>>;

  selectedItem: MultiValue<LotesDataInterface> | null;
  allDataInserted: boolean;
  anyDataInserted: boolean;
  setAnyDataInserted: Dispatch<SetStateAction<boolean>>;
}

export default function AdminNewClientInfos(props: AdminNewClientInfosInterface) {
  const [checkCpf, setCheckCpf] = useState<boolean>(false);
  const handleCpfMask = (value: string) => {
    value = value
      .replace(/\D/g, "")
      .substring(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    props.setCpf(value);
    if (value.length < 14) {
      setCheckCpf(false);
    } else {
      setCheckCpf(true);
    }
  };

  const [checkPhone, setCheckPhone] = useState<boolean>(false);
  const handlePhoneMask = (value: string) => {
    value = value
      .replace(/\D/g, "")
      .substring(0, 11)
      .replace(/(^\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d{4}$)/, "$1-$2");

    props.setPhone(value);
    if (value.length < 15) {
      setCheckPhone(false);
    } else {
      setCheckPhone(true);
    }
  };

  const handleLotePriceCurrencyMask = (rawValue: string) => {
    const convertedValue = rawValue
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".")
      .replace(/^0/, "");

    if (convertedValue !== "") {
      props.setDifferentPrice("R$ " + convertedValue);
    } else if (convertedValue === "") {
      props.setDifferentPrice("");
    }
  };

  const handleEntranceCurrencyMask = (rawValue: string) => {
    const convertedValue = rawValue
      .replace(/\D/g, "")
      .replace(/(\d)(\d{2})$/, "$1,$2")
      .replace(/(?=(\d{3})+(\D))\B/g, ".")
      .replace(/^0/, "");

    if (convertedValue !== "") {
      props.setEntrance("R$ " + convertedValue);
    } else if (convertedValue === "") {
      props.setEntrance("");
    }
  };

  const handleStandardEntrance = (newState: boolean) => {
    props.setStandardEntrance((state) => (state === newState ? true : newState));
  };

  const handleSpecial = (newState: boolean) => {
    props.setStandard((state) => (state === newState ? false : newState));
  };

  const [checkContractNumber, setCheckContractNumber] = useState<boolean>(false);
  const handleContractNumberMask = (rawValue: string) => {
    const convertedValue = rawValue
      .replace(/\D/g, "")
      .substring(0, 10)
      .replace(/(^\d{6})(\d)/, "$1-$2");
    props.setContractNumber(convertedValue);
    if (convertedValue.length < 11) {
      setCheckContractNumber(false)
    } else {
      setCheckContractNumber(true)
    }
  };

  return (
    // CLIENT INFOS
    <div className="flex flex-col items-center p-4">
      {/* CLIENT NAME */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Nome do Cliente</b>
        <input
          type="text"
          onChange={(e) => props.setName(e.target.value)}
          placeholder="Digite o nome Cliente"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            "response:w-[400px]",
            props.name === "" && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            props.name === "" && props.error && "visible animate-pulse"
          )}
        >
          Insira o nome do interessado!
        </b>
      </div>

      {/* CLIENT CONTACT */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Contato do Cliente</b>
        <input
          type="text"
          onChange={(e) => handlePhoneMask(e.target.value)}
          value={props.phone}
          placeholder="Digite o contato do Cliente"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            !checkPhone && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b className={twMerge("invisible text-red-500 text-sm", !checkPhone && props.error && "visible animate-pulse")}>
          Insira o contato do interessado!
        </b>
      </div>

      {/* CLIENT CPF */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">CPF do Cliente</b>
        <input
          type="text"
          onChange={(e) => handleCpfMask(e.target.value)}
          value={props.cpf}
          placeholder="Digite o CPF do Cliente"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            !checkCpf && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b className={twMerge("invisible text-red-500 text-sm", !checkCpf && props.error && "visible animate-pulse")}>
          Insira o CPF do interessado!
        </b>
      </div>

      {/* CLIENT BIRTH */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Data de Nascimento do Cliente</b>
        <input
          type="date"
          onChange={(e) => props.setBirth(e.target.value)}
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            "w-[200px] h-[48px]",
            props.birth === "" && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            props.birth === "" && props.error && "visible animate-pulse"
          )}
        >
          Insira a Data de Nascimento do Cliente!
        </b>
      </div>

      {/* CLIENT ADDRESS */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Endereço do Cliente</b>
        <textarea
          onChange={(e) => props.setAddress(e.target.value)}
          placeholder="Digite o Endereço do Cliente"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            "response:w-[400px]",
            props.address === "" && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            props.address === "" && props.error && "visible animate-pulse"
          )}
        >
          Insira o Endereço do Cliente!
        </b>
      </div>

      {/* SALE PLAN */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Quantidade de Parcelas (Plano)</b>
        <input
          type="number"
          onChange={(e) => props.setPlan(Number(e.target.value))}
          placeholder="Nº de Parcelas"
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            "w-[200px] h-[48px]",
            props.plan === 0 && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            props.plan === 0 && props.error && "visible animate-pulse"
          )}
        >
          Insira a Data de Nascimento do Cliente!
        </b>
      </div>

      {/* CONTRACT NUMBER */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Numero do Contrato</b>
        <div className="group">
          <input
            type="text"
            onChange={(e) => handleContractNumberMask(e.target.value)}
            value={props.contractNumber}
            className={twMerge(
              "relative text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
              "group-hover:scale-110 ease-in-out duration-100 focus:scale-110",
              !checkContractNumber && props.error && "border-red-500 animate-pulse"
            )}
          />
        </div>
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            !checkContractNumber && props.error && "visible animate-pulse"
          )}
        >
          Insira o Nº do Contrato!
        </b>
      </div>

      {/* CLIENT PAYMENT DATE START */}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Data da 1ª parcela</b>
        <input
          type="date"
          onChange={(e) => props.setStartDate(e.target.value)}
          className={twMerge(
            "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
            "hover:scale-110 focus:scale-110 ease-in-out duration-100",
            "w-[200px] h-[48px]",
            props.startDate === "" && props.error && "border-red-500 animate-pulse"
          )}
        />
        <b
          className={twMerge(
            "invisible text-red-500 text-sm",
            props.startDate === "" && props.error && "visible animate-pulse"
          )}
        >
          Insira a Data da 1ª parcela!
        </b>
      </div>

      {/* LOTE PRICE STANDARD ?*/}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Valor A VISTA é o padrão do site?</b>
        <div className="flex gap-4 mb-5">
          <Button
            className={twMerge(
              "hover:text-green-500 hover:border-green-500",
              props.standardPrice &&
                `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold
              hover:shadow-white shadow-md hover:border-green-500`
            )}
            onClick={() => {
              props.setPriceStandard(true), props.setStandardEntrance(true);
            }}
          >
            <h1> Sim </h1>
          </Button>
          <Button
            className={twMerge(
              "hover:text-red-500 hover:border-red-500",
              !props.standardPrice &&
                `border-red-500 bg-red-500 text-black1 hover:text-black1
                font-bold hover:shadow-white shadow-md hover:border-red-500`
            )}
            onClick={() => {
              props.setPriceStandard(false), props.setStandardEntrance(false);
            }}
          >
            <h1> Não </h1>
          </Button>
        </div>
        {!props.standardPrice && (
          <>
            <b className="text-sm">Insira abaixo o novo valor do Lote</b>
            <input
              type="text"
              placeholder="Valor da entrada diferente"
              onChange={(e) => handleLotePriceCurrencyMask(e.target.value)}
              value={props.differentPrice}
              className={twMerge(
                "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
                "hover:scale-110 focus:scale-110 ease-in-out duration-100",
                !props.standardPrice && props.differentPrice === "" && props.error && "border-red-500 animate-pulse"
              )}
            />
            <b
              className={twMerge(
                "invisible text-red-500 text-sm",
                !props.standardPrice && props.differentPrice === "" && props.error && "visible animate-pulse"
              )}
            >
              Insira a Data da 1ª parcela!
            </b>
          </>
        )}
      </div>

      {/* CLIENT ENTRANCE STANDARD ?*/}
      <div className="flex flex-col leading-tight items-center gap-1 mb-5">
        <b className="text-sm">O cliente pagou uma entrada diferente?</b>
        <div className="flex gap-4">
          <Button
            className={twMerge(
              "hover:text-green-500 hover:border-green-500",
              !props.standardEntrance &&
                `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold
              hover:shadow-white shadow-md hover:border-green-500`
            )}
            onClick={() => handleStandardEntrance(false)}
          >
            <h1> Sim </h1>
          </Button>
          <Button
            className={twMerge(
              "hover:text-red-500 hover:border-red-500",
              props.standardEntrance &&
                `border-red-500 bg-red-500 text-black1 hover:text-black1
                font-bold hover:shadow-white shadow-md hover:border-red-500`
            )}
            onClick={() => handleStandardEntrance(true)}
          >
            <h1> Não </h1>
          </Button>
        </div>
        {!props.standardEntrance && (
          <>
            <b className="text-sm">Insira abaixo valor diferente pago na entrada</b>
            <input
              type="text"
              placeholder="Valor da entrada diferente"
              onChange={(e) => handleEntranceCurrencyMask(e.target.value)}
              value={props.entrance}
              className={twMerge(
                "text-center rounded-lg text-black p-2 border-4 border-white placeholder:text-black",
                "hover:scale-110 focus:scale-110 ease-in-out duration-100",
                !props.standardEntrance && props.entrance === "" && props.error && "border-red-500 animate-pulse"
              )}
            />
            <b
              className={twMerge(
                "invisible text-red-500 text-sm",
                !props.standardEntrance && props.entrance === "" && props.error && "visible animate-pulse"
              )}
            >
              Insira a Data da 1ª parcela!
            </b>
          </>
        )}
      </div>

      {/* CLIENT SPECIAL CONTRACT ?*/}
      <div className="flex flex-col leading-tight items-center gap-1">
        <b className="text-sm">Contrato do tipo ESPECIAL?</b>
        <div className="flex gap-4 mb-5">
          <Button
            className={twMerge(
              "hover:text-green-500 hover:border-green-500",
              !props.standard &&
                `border-green-500 bg-green-500 text-black1 hover:text-black1 font-bold
              hover:shadow-white shadow-md hover:border-green-500`
            )}
            onClick={() => handleSpecial(false)}
          >
            <h1> Sim </h1>
          </Button>
          <Button
            className={twMerge(
              "hover:text-red-500 hover:border-red-500",
              props.standard &&
                `border-red-500 bg-red-500 text-black1 hover:text-black1
                font-bold hover:shadow-white shadow-md hover:border-red-500`
            )}
            onClick={() => handleSpecial(true)}
          >
            <h1> Não </h1>
          </Button>
        </div>
      </div>

      {/* ANY OBSERVATION ?*/}
      <div className="flex flex-col leading-tight items-center gap-1 mb-5">
        <b className="text-sm">Alguma observação?</b>
        <textarea
          onChange={(e) => props.setObs(e.target.value)}
          placeholder="Digite aqui a observação"
          className={twMerge(
            "placeholder:text-center response:w-[550px] response:h-36 w-64 h-24 text-justify rounded-lg text-black",
            "p-2 border-4 border-white"
          )}
        />
      </div>

      {/* DIGITAL CONTRACT URL */}
      <div className="flex flex-col leading-tight items-center gap-1 mb-5">
        <b className="text-sm">URL da Versão Digital do Contrato</b>
        <textarea
          onChange={(e) => props.setDigitalContract(e.target.value)}
          placeholder="Digite aqui o URL"
          className={twMerge(
            "placeholder:text-center response:w-[550px] w-64 h-24 text-justify rounded-lg text-black",
            "p-2 border-4 border-white"
          )}
        />
      </div>
    </div>
  );
}
