import { PageSelector, UserRoles } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MenuIcon } from "../utils/Icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";

interface HeaderInterface {
  page: string;
  handleError?: () => void;
  setSelectedClient?: (selection: null) => void;
}

export default function Header(props: HeaderInterface) {
  const { user, isLoading } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  const [toggleEtapas, setToggleEtapas] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [togglePanel, setTogglePanel] = useState<boolean>(false);

  const photosRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refPhotos = photosRef.current;
    const refMenu = menuRef.current;
    const refPanel = panelRef.current;

    document.addEventListener("click", ({ target }: MouseEvent): void => {
      if (
        !refPhotos?.contains(target as Node) &&
        !refMenu?.contains(target as Node) &&
        !refPanel?.contains(target as Node)
      ) {
        setToggleEtapas(false);
        setToggleMenu(false);
        setTogglePanel(false);
      }
    });

    return () => {
      document.removeEventListener("click", ({ target }: MouseEvent): void => {
        if (
          !refPhotos?.contains(target as Node) &&
          !refMenu?.contains(target as Node) &&
          !refPanel?.contains(target as Node)
        ) {
          setToggleEtapas(false);
          setToggleMenu(false);
          setTogglePanel(false);
        }
      });
    };
  }, [toggleEtapas]);

  const handlePageHeader = () => {
    if (props.page === PageSelector.ErrorPage) {
      return "ERRO";
    } else if (props.page === PageSelector.Etapa1) {
      return "Etapa 1";
    } else if (props.page === PageSelector.Etapa2) {
      return "Etapa 2";
    } else if (props.page === PageSelector.Etapa3) {
      return "Etapa 3";
    } else if (props.page === PageSelector.Etapa4) {
      return "Etapa 4";
    } else if (props.page === PageSelector.ClientSearch) {
      return "Área do Cliente";
    } else if (
      (checkRoles(UserRoles.Agents) || checkRoles(UserRoles.Admins)) &&
      props.page === PageSelector.AdminSearch
    ) {
      return "Buscar Cliente";
    } else if (
      (checkRoles(UserRoles.Agents) || checkRoles(UserRoles.Admins)) &&
      props.page === PageSelector.AdminReadjustClient
    ) {
      return "Simular Reajuste - Cliente";
    } else if (
      (checkRoles(UserRoles.Agents) || checkRoles(UserRoles.Admins)) &&
      props.page === PageSelector.AdminReadjustSimulate
    ) {
      return "Simular Reajuste - Lote";
    } else if (
      (checkRoles(UserRoles.Agents) || checkRoles(UserRoles.Admins)) &&
      props.page === PageSelector.AdminPersonalizedQuote
    ) {
      return "Orçamento Personalizado";
    } else if (
      (checkRoles(UserRoles.Agents) || checkRoles(UserRoles.Admins)) &&
      props.page === PageSelector.AdminShowReservations
    ) {
      return "Ver Reservas";
    } else if (
      (checkRoles(UserRoles.Agents) || checkRoles(UserRoles.Admins)) &&
      props.page === PageSelector.AdminEditReservations
    ) {
      return "Editar Reservas";
    } else {
      return "ERRO - Sem Acesso";
    }
  };

  return (
    <div
      className={twMerge(
        "flex justify-between bg-black text-white font-bold shadow-xl select-none m-auto w-full",
        "response:justify-evenly response:gap-5 px-3"
      )}
      ref={menuRef}
    >
      <Head>
        {props.page === PageSelector.HomePage ? (
          <title>Loteamento R. Martins</title>
        ) : (
          <title>{isLoading ? "Carregando..." : handlePageHeader()}</title>
        )}
      </Head>
      <Link href={PageSelector.HomePage}>
        <Image
          className="py-2 w-[180px] response:w-[250px]"
          src="/logoLoteamento.png"
          width={500}
          height={200}
          alt="Logo do Site"
        />
      </Link>
      <div
        className="flex response:hidden"
        onClick={() => {
          setToggleMenu((prevState) => !prevState);
          toggleMenu && setToggleEtapas(false);
        }}
      >
        <MenuIcon
          width={50}
          className={twMerge(
            "cursor-pointer ease-in-out duration-200 stroke-white",
            "hover:scale-110 hover:stroke-yellow1 active:scale-90 active:duration-100",
            toggleMenu && "stroke-yellow1"
          )}
          fill="none"
        />
      </div>
      <div
        className={twMerge(
          "hidden response:flex pr-6 w-full",
          toggleMenu && "flex flex-col absolute w-fit right-0 top-16 rounded-xl bg-black p-2 gap-1 z-50"
        )}
      >
        <div
          className={twMerge(
            "flex flex-col gap-3 p-2 relative items-center w-full",
            "response:gap-6 response:pr-0 response:flex-row"
          )}
        >
          {props.page !== PageSelector.HomePage && (
            <Link
              className={twMerge(
                "ease-in-out duration-200 hover:text-yellow1 hover:scale-110",
                "active:scale-90 active:duration-100"
              )}
              href="/"
            >
              <h3> PAGINA INICIAL </h3>
            </Link>
          )}

          {props.page !== PageSelector.ClientSearch && (
            <Link
              className={twMerge(
                "ease-in-out duration-200 hover:text-yellow1 hover:scale-110",
                "active:scale-90 active:duration-100"
              )}
              href={PageSelector.ClientSearch}
            >
              <h3> ÁREA DO CLIENTE </h3>
            </Link>
          )}

          <div className="z-50">
            <div
              className={twMerge(
                "flex justify-center cursor-pointer ",
                "ease-in-out duration-200 hover:scale-110",
                "hover:text-yellow1 active:scale-90 active:duration-100",
                toggleEtapas && "text-yellow1"
              )}
              onClick={() => setToggleEtapas((toggleEtapas) => !toggleEtapas)}
              ref={photosRef}
            >
              FOTOS
            </div>
            <div
              className={twMerge(
                "hidden rounded-md bg-black1 p-2 gap-2",
                "response:bg-black response:absolute response:-translate-x-3 response:top-24",
                toggleEtapas && "flex flex-col"
              )}
            >
              {props.page !== PageSelector.Etapa1 && (
                <Link
                  className={twMerge(
                    "ease-in-out duration-200 hover:text-yellow1",
                    "active:scale-90 active:duration-100"
                  )}
                  href={PageSelector.Etapa1}
                >
                  ETAPA 1
                </Link>
              )}
              {props.page !== PageSelector.Etapa2 && (
                <Link
                  className={twMerge(
                    "ease-in-out duration-200 hover:text-yellow1",
                    "active:scale-90 active:duration-100"
                  )}
                  href={PageSelector.Etapa2}
                >
                  ETAPA 2
                </Link>
              )}
            </div>
          </div>
          {!isLoading && (
            <div className="z-50">
              <div className="flex items-center">
                {!user ? (
                  <Link
                    className={twMerge(
                      "ease-in-out duration-200 response:absolute right-0",
                      "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                    )}
                    href={PageSelector.AdminLogin}
                  >
                    <h1>LOGIN</h1>
                  </Link>
                ) : (
                  <div
                    className={twMerge(
                      "flex justify-center items-center text-center gap-2 m-auto cursor-pointer",
                      "ease-in-out duration-200 response:absolute right-0",
                      "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100 response:w-28",
                      togglePanel && "text-yellow1"
                    )}
                    onClick={() => setTogglePanel((togglePanel) => !togglePanel)}
                    ref={panelRef}
                  >
                    <Image
                      className="w-[40px] response:w-[60px] rounded-lg"
                      src={`${user.picture}`}
                      width={500}
                      height={500}
                      alt="User icon"
                      unoptimized
                    />
                    {user.name?.split(" ")[0].toLocaleUpperCase()}
                  </div>
                )}
              </div>

              <div
                className={twMerge(
                  "hidden rounded-md bg-black1 gap-2 p-2 right-5",
                  "response:-right-4 response:top-24 response:p-3 response:absolute response:bg-black",
                  togglePanel && "flex flex-col"
                )}
              >
                {/* ADMINS & AGENTS - OPTIONS */}
                {(checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Agents)) && (
                  <>
                    {props.page !== PageSelector.AdminSearch && (
                      <Link
                        className={twMerge(
                          "ease-in-out duration-200 text-center cursor-pointer",
                          "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                        )}
                        href={PageSelector.AdminSearch}
                      >
                        <h1>BUSCAR CLIENTE</h1>
                      </Link>
                    )}

                    {props.page !== PageSelector.AdminShowReservations && (
                      <Link
                        className={twMerge(
                          "ease-in-out duration-200 text-center cursor-pointer",
                          "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                        )}
                        href={PageSelector.AdminShowReservations}
                      >
                        <h1>VER RESERVAS</h1>
                      </Link>
                    )}

                    {props.page !== PageSelector.AdminEditReservations && (
                      <Link
                        className={twMerge(
                          "ease-in-out duration-200 text-center cursor-pointer",
                          "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                        )}
                        href={PageSelector.AdminEditReservations}
                      >
                        <h1>MODIFICAR RESERVAS</h1>
                      </Link>
                    )}

                    {props.page !== PageSelector.AdminPersonalizedQuote && (
                      <Link
                        className={twMerge(
                          "ease-in-out duration-200 text-center cursor-pointer",
                          "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                        )}
                        href={PageSelector.AdminPersonalizedQuote}
                      >
                        <h1>ORÇAMENTO PERSONALIZADO</h1>
                      </Link>
                    )}

                    {props.page !== PageSelector.AdminReadjustSimulate && (
                      <Link
                        className={twMerge(
                          "ease-in-out duration-200 text-center cursor-pointer",
                          "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                        )}
                        href={PageSelector.AdminReadjustSimulate}
                      >
                        <h1>SIMULAR REAJUSTE</h1>
                      </Link>
                    )}

                    {props.page !== PageSelector.AdminReadjustClient && (
                      <Link
                        className={twMerge(
                          "ease-in-out duration-200 text-center cursor-pointer",
                          "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                        )}
                        href={PageSelector.AdminReadjustClient}
                      >
                        <h1>REAJUSTE DE CLIENTE</h1>
                      </Link>
                    )}
                  </>
                )}

                <Link
                  className={twMerge(
                    "ease-in-out duration-200 text-center cursor-pointer",
                    "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                  )}
                  onClick={() => {
                    setTogglePanel(false);
                    setToggleMenu(false);
                    props.handleError?.();
                    props.setSelectedClient?.(null);
                  }}
                  href={PageSelector.AdminLogout}
                >
                  DESCONECTAR
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
