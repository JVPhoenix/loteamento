import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CPFIcon, PassowrdIcon, RememberMeIcon } from "./Icons";
import { useAdminsData } from "@/context/AdminsDataContext";

interface AdminPageLoginInferface {
  searchError: boolean;
  handleError: () => void;
  checkRemember: boolean;
  setCheckRemember: Dispatch<SetStateAction<boolean>>;
}

export default function AdminPageLogin(props: AdminPageLoginInferface) {
  const { setAdminLogin } = useAdminsData();
  const [effectOn, setEffectOn] = useState<boolean>(false);
  const [checkCpf, setCheckCpf] = useState<boolean>(true);
  const [cpfMask, setCpfMask] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleCpfMask = (value: string) => {
    value = value
      .replace(/\D/g, "")
      .substring(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpfMask(value);
    if (value.length < 14) {
      setCheckCpf(false);
    } else {
      setCheckCpf(true);
    }
  };

  const handleSubmit = () => {
    setAdminLogin({
      cpf: cpfMask,
      password: password,
    });

    props.handleError();
    setEffectOn(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold select-none">ADMINISTRAÇÃO</h1>
      <div
        className={twMerge(
          "flex flex-col items-center gap-3 rounded-lg border-2 p-5 w-auto",
          props.searchError && effectOn && "animate-shake"
        )}
        onAnimationEnd={() => setEffectOn(false)}
      >
        <div className="flex response:gap-2">
          <div className="flex flex-col response:gap-3 gap-2 mt-1">
            <CPFIcon className="" width={50} fill="none" stroke="white" />
            <PassowrdIcon className="" width={50} fill="white" stroke="none" />
          </div>
          <div className="flex flex-col py-1 gap-2 whitespace-nowrap response:w-96">
            <input
              type="text"
              placeholder="Digite o seu CPF"
              className={twMerge("rounded-lg text-black p-2 border-4 border-white", !checkCpf && "border-red-500")}
              value={cpfMask}
              onChange={(e) => handleCpfMask(e.target.value)}
            />
            <input
              type="password"
              placeholder="Digite sua Senha"
              className={twMerge(
                "flex flex-col py-1 gap-2 whitespace-nowrap response:w-96",
                "rounded-lg text-black p-2 border-4 border-white"
              )}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-1">
          <div
            className={twMerge(
              "ease-in-out duration-200 select-none active:duration-100",
              "hover:scale-110 active:scale-90 hover:border-yellow1"
            )}
            onClick={() => props.setCheckRemember((prevCheckRemember) => !prevCheckRemember)}
          >
            <RememberMeIcon
              className=""
              width={40}
              stroke={props.checkRemember ? "rgb(255, 204, 41)" : "white"}
              fill={props.checkRemember ? "none" : "white"}
            />
          </div>
          <h1>Lembrar senha</h1>
        </div>

        <div
          className={twMerge(
            "ease-in-out duration-200 w-auto p-4 select-none active:duration-100 cursor-not-allowed",
            "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl text-gray1 border-gray1",
            checkCpf &&
              "hover:text-yellow1 hover:scale-110 active:scale-90 hover:border-yellow1 border-white text-white cursor-pointer"
          )}
          onClick={() => checkCpf && handleSubmit()}
        >
          <h1> ENTRAR </h1>
        </div>
      </div>
      <h1
        className={twMerge(
          "text-2xl response:text-3xl text-center px-11 response:p-0 font-bold select-none",
          !props.searchError && "text-white drop-shadow-titles",
          props.searchError && "text-white-400 drop-shadow-errors",
          effectOn && "animate-shake text-red-500"
        )}
      >
        {props.searchError ? "CPF ou SENHA inválidos!" : "Insira seu CPF e sua SENHA"}
      </h1>
    </div>
  );
}
