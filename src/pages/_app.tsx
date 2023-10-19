import { LotesDataContextProvider } from "@/context/LotesDataContext";
import { ClientsDataContextProvider } from "@/context/ClientsDataContext";
import { PhotosDataContextProvider } from "@/context/PhotosDataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AdminsDataContextProvider } from "@/context/AdminsDataContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AdminsDataContextProvider>
      <ClientsDataContextProvider>
        <LotesDataContextProvider>
          <PhotosDataContextProvider>
            <Component {...pageProps} />
          </PhotosDataContextProvider>
        </LotesDataContextProvider>
      </ClientsDataContextProvider>
    </AdminsDataContextProvider>
  );
}
