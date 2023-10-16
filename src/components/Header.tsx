import { PageSelector } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderInterface {
  page: number;
}

export default function Header(props: HeaderInterface) {
  const [toggleEtapas, setToggleEtapas] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", () => setToggleEtapas(false));
    return () => {
      document.removeEventListener("mouseup", () => setToggleEtapas(false));
    };
  }, [setToggleEtapas]);

  return (
    <div className="bg-black text-white font-bold mb-4 shadow-xl flex-wrap">
      <div className="flex min-w-screen  response:gap-5">
        <Image
          className="p-3 w-[200px] response:w-[250px]"
          src="/logoLoteamento.png"
          width={500}
          height={200}
          alt="Logo do Site"
        />
        <div className="flex m-2">
          <div className={twMerge("flex gap-5 justify-center align-middle items-center pr-5", "response:pr-0")}>
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

            <div className="inline-block z-10">
              <button
                className={twMerge(
                  "cursor-pointer ease-in-out duration-200 hover:scale-110",
                  "hover:text-yellow1 active:scale-90 active:duration-100",
                  toggleEtapas && "text-yellow1"
                )}
                onClick={() => setToggleEtapas((toggleEtapas) => !toggleEtapas)}
              >
                FOTOS
              </button>
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
          </div>
        </div>
      </div>
    </div>
  );
}
