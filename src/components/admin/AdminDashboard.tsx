import Link from "next/link";
import { Button } from "../utils/Button";
import { PageSelector } from "@/types";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold select-none">
        PAINEL DO ADMINISTRADOR
      </h1>
      <div className="flex flex-col gap-10 px-6 items-center response1:flex-row response:gap-14">
        <Link href={PageSelector.AdminSearch}>
          <Button className="" onClick={() => null}>
            BUSCAR CLIENTE
          </Button>
        </Link>
        <Link href={PageSelector.AdminReadjustClient}>
          <Button className="" onClick={() => null}>
            REAJUSTE DO CLIENTE
          </Button>
        </Link>
        <Link href={PageSelector.AdminReadjustSimulate}>
          <Button className="" onClick={() => null}>
            SIMULAR REAJUSTES
          </Button>
        </Link>
        <Link href={PageSelector.AdminPersonalizedQuote}>
          <Button className="" onClick={() => null}>
            ORÇAMENTO PERSONALIZADO
          </Button>
        </Link>
        <Link href={PageSelector.AdminShowReservations}>
          <Button className="" onClick={() => null}>
            VER RESERVAS
          </Button>
        </Link>
        <Link href={PageSelector.AdminEditReservations}>
          <Button className="" onClick={() => null}>
            EDITAR OU DELETAR RESERVAS
          </Button>
        </Link>
      </div>
    </div>
  );
}
