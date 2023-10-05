import { PageContextProvider } from "@/context/PageContext";
import { LotesDataContextProvider } from "@/context/LotesDataContext";
import { PhotosDataContextProvider } from "@/context/PhotosDataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LotesDataContextProvider>
      <PhotosDataContextProvider>
        <PageContextProvider>
          <Component {...pageProps} />
        </PageContextProvider>
      </PhotosDataContextProvider>
    </LotesDataContextProvider>
  );
}
