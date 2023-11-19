export default function Footer() {
  return (
    <div className="text-center text-white">
      <p>
        Developed and designed by{" "}
        <span
          onClick={() =>
            window.open(
              "https://jvphoenixportfolio.netlify.app/",
              "_blank",
              "noopener, noreferrer"
            )
          }
        >
          <u className="cursor-pointer">jvphoenix</u>
        </span>
      </p>
      <p>Todos os Direitos Reservados ®Loteamento R. Martins 2022-2023</p>
    </div>
  );
}
