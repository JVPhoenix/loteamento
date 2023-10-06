import { usePage } from "@/context/PageContext";
import { HeaderSelector } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const [toggleEtapas, setToggleEtapas] = useState(false);
  const { page, setPage } = usePage();
  const { query } = useRouter();

  useEffect(() => {
    if (query.photos === "etapa1") {
      setPage(HeaderSelector.Etapa1);
    } else if (query.photos === "etapa2") {
      setPage(HeaderSelector.Etapa2);
    } else {
      setPage(HeaderSelector.HomePage)
    }
  }, [query]);

  useEffect(() => {
    document.addEventListener("mouseup", () => setToggleEtapas(false));
    return () => {
      document.removeEventListener("mouseup", () => setToggleEtapas(false));
    };
  }, [setPage]);

  return (
    <div className="bg-black text-white font-bold mb-4 shadow-xl flex-wrap">
      <div className="flex min-w-screen gap-5">
        <Image
          className="p-3 w-[200px] response:w-[250px]"
          src="/logoLoteamento.png"
          width={500}
          height={200}
          alt="Logo do Site"
        />
        <div className="flex m-2">
          <div className={twMerge("flex gap-4 justify-center align-middle items-center")}>
            {page !== HeaderSelector.HomePage && (
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
                {page !== HeaderSelector.Etapa1 && (
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
                {page !== HeaderSelector.Etapa2 && (
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
    </div>
  );
}
