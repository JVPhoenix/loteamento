import { PageSelector } from "@/types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ErrorPageInterface {
  page?: PageSelector;
}

export default function ErrorPage(props: ErrorPageInterface) {
  return (
    <div className="flex flex-col m-auto items-center text-white gap-2 text-3xl select-none font-bold px-3">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-9xl text-white tracking-widest">404</h1>
        <div className="bg-gray1  text-black1 px-2 text-sm rounded rotate-12 absolute">
          <h1>OCORREU UM ERRO AO CARREGAR</h1>
        </div>
      </div>
      {props.page === PageSelector.AdminSearch ||
      props.page === PageSelector.AdminReadjustClient ||
      props.page === PageSelector.AdminReadjustSimulate ? (
        <>
          <h1 className="text-white text-center text-xl response:text-2xl font-bold select-none">
            Para acessar essa página é necessário fazer Login.
          </h1>
          <Link
            className={twMerge(
              "ease-in-out duration-200 w-auto text-xl p-4",
              "hover:text-yellow1 hover:scale-110 active:scale-90 active:duration-100 hover:border-yellow1",
              "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl"
            )}
            href="/login"
          >
            <h1> FAZER LOGIN </h1>
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-white text-center text-xl response:text-2xl font-bold select-none mb-3">
            A página que você tentou acessar NÃO EXISTE!
          </h1>
          <h1 className="text-white text-center font-normal text-xl response:text-2xl select-none mb-3">
            Vá para a Página Inicial ou para o Painel do Administrador
          </h1>
          <div className="flex items-center gap-8">
            <Link
              className={twMerge(
                "ease-in-out duration-200 w-auto text-xl p-4",
                "hover:text-yellow1 hover:scale-110 active:scale-90 active:duration-100 hover:border-yellow1",
                "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl"
              )}
              href="/"
            >
              <h1> PAGINA INICIAL </h1>
            </Link>

            <Link
              className={twMerge(
                "ease-in-out duration-200 w-auto text-xl p-4",
                "hover:text-yellow1 hover:scale-110 active:scale-90 active:duration-100 hover:border-yellow1",
                "border border-solid rounded-tr-lg rounded-bl-lg rounded-tl-2xl rounded-br-2xl"
              )}
              href="/login"
            >
              <h1> PAINEL DO ADMINISTRADOR </h1>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
