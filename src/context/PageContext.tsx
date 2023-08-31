import { HeaderSelector, PageType } from "@/types";
import React, { createContext, useContext, useState } from "react";

// context created
export const PageContext = createContext<PageType>({ page: HeaderSelector.HomePage, setPage: () => undefined });

// react function context
export function PageContextProvider(props: React.PropsWithChildren) {
  const [page, setPage] = useState<number>(HeaderSelector.HomePage);
  return <PageContext.Provider value={{ page, setPage }}>{props.children}</PageContext.Provider>;
}

// use the context
export const usePage = () => {
  return useContext(PageContext);
};
