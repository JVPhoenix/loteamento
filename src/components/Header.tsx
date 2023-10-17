import { PageSelector } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MenuIcon } from "./Icons";

interface HeaderInterface {
  page: number;
}

export default function Header(props: HeaderInterface) {
  const [toggleEtapas, setToggleEtapas] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const photosRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refP = photosRef.current;
    const refM = menuRef.current;

    document.addEventListener("click", ({ target }: MouseEvent): void => {
      if (!refP?.contains(target as Node) && !refM?.contains(target as Node)) {
        setToggleEtapas(false);
        setToggleMenu(false);
      }
    });

    return () => {
      document.removeEventListener("click", ({ target }: MouseEvent): void => {
        if (!refP?.contains(target as Node) && !refM?.contains(target as Node)) {
          setToggleEtapas(false);
          setToggleMenu(false);
        }
      });
    };
  }, [toggleEtapas]);

  return (
    <div
      className={twMerge(
        "flex px-2 justify-between bg-black text-white font-bold mb-4 shadow-xl select-none",
        "response:justify-normal response:gap-5"
      )}
      ref={menuRef}
    >
      <Image
        className="p-3 w-[180px] response:w-[250px]"
        src="/logoLoteamento.png"
        width={500}
        height={200}
        alt="Logo do Site"
      />
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
          "hidden response:flex m-2",
          toggleMenu && "flex flex-col absolute w-fit right-0 top-16 rounded-xl bg-black p-2 gap-1 z-50"
        )}
      >
        <div className="flex flex-col response:flex-row gap-3 response:gap-6 justify-center align-middle items-center p-2 response:pr-0">
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

          {props.page !== PageSelector.Client && (
            <Link
              className={twMerge(
                "ease-in-out duration-200 hover:text-yellow1 hover:scale-110",
                "active:scale-90 active:duration-100"
              )}
              href="/client"
            >
              <h3> ÁREA DO CLIENTE </h3>
            </Link>
          )}

          <div className="inline-block z-10">
            <div
              className={twMerge(
                "cursor-pointer ease-in-out duration-200 hover:scale-110",
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
                "hidden absolute rounded-md bg-black p-2 gap-2 -translate-x-2",
                toggleEtapas && "flex flex-col"
              )}
            >
              {props.page !== PageSelector.Etapa1 && (
                <Link
                  className={twMerge(
                    "ease-in-out duration-200 hover:text-yellow1",
                    "active:scale-90 active:duration-100"
                  )}
                  href={`/${"etapa1"}`}
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
                  href={`/${"etapa2"}`}
                >
                  ETAPA 2
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
