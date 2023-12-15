import { AdminsDataInterface, PageSelector } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MenuIcon } from "../svg/Icons";
import { useAdminsData } from "@/context/AdminsDataContext";

interface HeaderInterface {
  page: string;
  handleError?: () => void;
  setSelectedClient?: (selection: null) => void;
}

export default function Header(props: HeaderInterface) {
  const { searchAdmin, setAdminLogin } = useAdminsData();
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

  useEffect(() => {
    const data = window.localStorage.getItem("USER_CREDENTIALS");
    if (data !== null) {
      setAdminLogin(JSON.parse(data));
    }
  }, [setAdminLogin]);

  return (
    <div
      className={twMerge(
        "flex justify-between bg-black text-white font-bold shadow-xl select-none m-auto w-full",
        "response:justify-evenly response:gap-5 px-3"
      )}
      ref={menuRef}
    >
      <Link href={"/"}>
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

          <div className="z-10">
            <div className="flex items-center">
              {searchAdmin?.length === 0 ? (
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
                searchAdmin?.length !== 0 && (
                  <div
                    className={twMerge(
                      "flex justify-center m-auto cursor-pointer",
                      "ease-in-out duration-200 response:absolute right-0",
                      "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100 response:w-28",
                      togglePanel && "text-yellow1"
                    )}
                    onClick={() => setTogglePanel((togglePanel) => !togglePanel)}
                    ref={panelRef}
                  >
                    {searchAdmin?.map((value) => value.name.toLocaleUpperCase())}
                  </div>
                )
              )}
            </div>

            <div
              className={twMerge(
                "hidden rounded-md bg-black1 gap-2 p-2 right-5",
                "response:-right-4 response:top-24 response:p-3 response:absolute response:bg-black",
                togglePanel && "flex flex-col"
              )}
            >
              {props.page !== PageSelector.AdminLogin && (
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

                  {props.page !== PageSelector.AdminReadjustClient && (
                    <Link
                      className={twMerge(
                        "ease-in-out duration-200 text-center cursor-pointer",
                        "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                      )}
                      href={PageSelector.AdminReadjustClient}
                    >
                      <h1>REAJUSTE - CLIENTE</h1>
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
                </>
              )}

              <div
                className={twMerge(
                  "ease-in-out duration-200 text-center cursor-pointer",
                  "hover:scale-110 hover:text-yellow1 active:scale-90 active:duration-100"
                )}
                onClick={() => {
                  setAdminLogin({
                    cpf: "",
                    password: "",
                  });
                  window.localStorage.removeItem("USER_CREDENTIALS");
                  setTogglePanel(false);
                  setToggleMenu(false);
                  props.handleError?.();
                  props.setSelectedClient?.(null);
                }}
              >
                DESCONECTAR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
