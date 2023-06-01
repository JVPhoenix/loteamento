import { HeaderSelector } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderInterface {
  page: number;
}

export default function Header(props: HeaderInterface) {
  const [toggleEtapas, setToggleEtapas] = useState(false);
  const [home, setHome] = useState(false);
  const [images, setImages] = useState(true);
  const [phases, setPhases] = useState(true);

  useEffect(() => {
    if (props.page === HeaderSelector.Photos) {
      setHome(true);
      setImages(false);
    }
    if (props.page === HeaderSelector.Phases) {
      setHome(true);
      setPhases(false);
    }
    document.addEventListener("mouseup", () => setToggleEtapas(false));
    return () => {
      document.removeEventListener("mouseup", () => setToggleEtapas(false));
    };
  }, []);

  return (
    <div className="bg-black text-white font-bold mb-4 shadow-xl flex-wrap">
      <div className="flex min-w-screen gap-5">
        <Image className="p-3 w-[200px] response:w-[250px]" src="/logoLoteamento.png" width={250} height={100} alt="Logo do Site"/>
        <div className="flex m-2">
          <div className={twMerge("flex gap-4 justify-center align-middle items-center")}>
            {home && (
              <Link
                href="/"
                className={twMerge(
                  "ease-in-out duration-200 hover:text-yellow1 hover:scale-110",
                  "active:scale-90 active:duration-100"
                )}
              >
                <h3> PAGINA INICIAL </h3>
              </Link>
            )}

            {images && (
              <Link
                href="/Images"
                className={twMerge(
                  "ease-in-out duration-200 hover:text-yellow1 hover:scale-110",
                  "active:scale-90 active:duration-100"
                )}
              >
                <h3> FOTOS E VIDEOS </h3>
              </Link>
            )}
            {/* {phases && (
              <div className="inline-block z-10">
                <button
                  className={twMerge(
                    "cursor-pointer ease-in-out duration-200 hover:scale-110",
                    "hover:text-yellow1 active:scale-90 active:duration-100",
                    toggleEtapas && "text-yellow1"
                  )}
                  onClick={() => setToggleEtapas((toggleEtapas) => !toggleEtapas)}
                >
                  ETAPAS
                </button>
                <div
                  className={twMerge(
                    "hidden absolute rounded-md bg-black p-2 gap-2 -translate-x-2",
                    toggleEtapas && "flex flex-col"
                  )}
                >
                  <Link
                    className={twMerge(
                      "ease-in-out duration-200 hover:text-yellow1",
                      "active:scale-90 active:duration-100"
                    )}
                    href="/"
                  >
                    ETAPA 1
                  </Link>
                  <Link
                    className={twMerge(
                      "ease-in-out duration-200 hover:text-yellow1",
                      "active:scale-90 active:duration-100"
                    )}
                    href="/"
                  >
                    ETAPA 2
                  </Link>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
