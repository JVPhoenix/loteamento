import { AlertIcon, MaintenanceIcon } from "./Icons";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-3 text-center">
      <div className="flex m-auto w-full justify-evenly animate-pulse">
        <AlertIcon className="fill-yellow1" width={60} />
        <MaintenanceIcon className="fill-green-600" width={60} />
        <AlertIcon className="fill-yellow1" width={60} />
      </div>
      <h1 className="text-gray-200 text-4xl response:text-6xl font-bold select-none leading-none tracking-tight">
        EM MANUTENÇÃO
      </h1>
      <div className="flex flex-col items-center text-gray-400 response:text-2xl font-thin">
        <h1>A página em questão está em manutenção!</h1>
        <h1>Pedimos desculpas pelo incômodo! </h1>
      </div>
    </div>
  );
}
