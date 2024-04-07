import { PageSelector } from "@/types";

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
      props.page === PageSelector.AdminReadjustSimulate ||
      props.page === PageSelector.AdminPersonalizedQuote ||
      props.page === PageSelector.AdminShowReservations ||
      props.page === PageSelector.AdminEditReservations ? (
        <>
          <h1 className="text-white text-center text-xl response:text-2xl font-bold select-none">
            Para acessar essa página é necessário fazer Login.
          </h1>
        </>
      ) : (
        <>
          <h1 className="text-white text-center text-xl response:text-2xl font-bold select-none mb-3">
            A página que você tentou acessar NÃO EXISTE!
          </h1>
          <h1 className="text-white text-center font-normal text-xl response:text-2xl select-none mb-3">
            Vá para a Página Inicial ou selecione outra página no menu!
          </h1>
        </>
      )}
    </div>
  );
}
