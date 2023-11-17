import Link from "next/link";
import { Button } from "./Button";
import { PageSelector } from "@/types";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-white drop-shadow-titles text-2xl response:text-3xl font-bold select-none">
        PAINEL DO ADMINISTRADOR
      </h1>
      <div className="flex gap-20 px-6">
        <Link href={PageSelector.AdminSearch}>
          <Button className="" onClick={() => null}>
            BUSCAR CLIENTE
          </Button>
        </Link>
        <Link href={PageSelector.AdminSimulate}>
          <Button className="" onClick={() => null}>
            SIMULAR REAJUSTES
          </Button>
        </Link>
      </div>
    </div>
  );
}
