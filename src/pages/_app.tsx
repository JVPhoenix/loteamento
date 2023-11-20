import { LotesDataContextProvider } from "@/context/LotesDataContext";
import { ClientsDataContextProvider } from "@/context/ClientsDataContext";
import { PhotosDataContextProvider } from "@/context/PhotosDataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AdminsDataContextProvider } from "@/context/AdminsDataContext";
import { twMerge } from "tailwind-merge";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={twMerge(inter.className)}>
      <AdminsDataContextProvider>
        <ClientsDataContextProvider>
          <LotesDataContextProvider>
            <PhotosDataContextProvider>
              <Component {...pageProps} />
            </PhotosDataContextProvider>
          </LotesDataContextProvider>
        </ClientsDataContextProvider>
      </AdminsDataContextProvider>
    </div>
  );
}
