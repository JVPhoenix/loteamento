import { PageContextProvider } from "@/context/PageContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageContextProvider>
      <Component {...pageProps} />
    </PageContextProvider>
  );
}
