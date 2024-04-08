import test from "../../../package.json";

export default function Footer() {
  return (
    <div className="text-center text-white select-none">
      <p>
        Versão {test.version}, desenvolvido e projetado por{" "} 
        <span onClick={() => window.open("https://jvphoenixportfolio.netlify.app/", "_blank", "noopener, noreferrer")}>
          <u className="cursor-pointer">jvphoenix</u>
        </span>
      </p>

      <p>Todos os Direitos Reservados ®Loteamento R. Martins 2022-2024</p>
    </div>
  );
}
