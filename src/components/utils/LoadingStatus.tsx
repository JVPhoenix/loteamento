import { LoadingIcon } from "./Icons";

export default function LoadingStatus() {
  return (
      <div className="flex items-center justify-center text-white gap-2 text-3xl">
        <LoadingIcon width={20} className="text-gray-200 animate-spin fill-red-600 max-w-20" />
        <h1>Carregando, aguarde!</h1>
      </div>
  );
}
