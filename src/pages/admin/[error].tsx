import ErrorPage from "@/components/utils/ErrorPage";
import Header from "@/components/home/Header";
import { PageSelector } from "@/types";

export default function AdminErrorPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Header page={PageSelector.ErrorPage} />
      </div>
      <ErrorPage />
    </div>
  );
}
