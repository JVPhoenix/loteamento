import { LotesDataContextProvider } from "@/context/LotesDataContext";
import { ClientsDataContextProvider } from "@/context/ClientsDataContext";
import { PhotosDataContextProvider } from "@/context/PhotosDataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LotesDataContextProvider>
      <PhotosDataContextProvider>
        <ClientsDataContextProvider>
          <Component {...pageProps} />
        </ClientsDataContextProvider>
      </PhotosDataContextProvider>
    </LotesDataContextProvider>
  );
}
