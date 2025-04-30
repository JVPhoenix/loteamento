import Link from "next/link";
import test from "../../../package.json";

export default function Footer() {
  return (
    <div className="text-center text-white select-none">
      <div className="flex justify-center text-center">
        <p>
          Versão {test.version},{" "}
          <Link
            className="underline underline-offset-4 cursor-pointer"
            href="https://jvphoenixportfolio.netlify.app/"
            target="_blank"
            rel="noopener, noreferrer"
          >
            desenvolvido e projetado por João Vitor Oliveira
          </Link>
        </p>
      </div>
      <p>Todos os Direitos Reservados ®Loteamento R. Martins 2022-2025</p>
    </div>
  );
}
