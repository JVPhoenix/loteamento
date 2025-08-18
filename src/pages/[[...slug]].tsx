import AdminSearch from "@/components/admin/landpages/buscar";
import NewClient from "@/components/admin/landpages/novo-cliente";
import AdminPersonalizedQuotes from "@/components/admin/landpages/orcamentos-personalizados";
import AdminReadjustClient from "@/components/admin/landpages/reajuste/reajuste-de-cliente";
import AdminReadjustSimulate from "@/components/admin/landpages/reajuste/simular-reajuste";
import AdminEditReservations from "@/components/admin/landpages/reservas/editar-reservas";
import AdminShowReservations from "@/components/admin/landpages/reservas/ver-reservas";
import ClientPage_Temporary from "@/components/client/ClientPage_Temporary";
import ClientPageSearch from "@/components/client/ClientPageSearch";
import About from "@/components/home/About";
import Contacts from "@/components/home/Contacts";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Photos from "@/components/home/Photos";
import Products from "@/components/products/Products";
import ErrorPage from "@/components/utils/ErrorPage";
import LoadingStatus from "@/components/utils/LoadingStatus";
import MaintenancePage from "@/components/utils/MaintenancePage";
import { PageSelector, UserRoles } from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

export default function Home() {
  const pathname = usePathname();

  // USER CHECKER
  const { user, isLoading } = useUser();
  const checkRoles = (role: string) => {
    if (user) {
      const userRoles: any = user.userRoles;
      return userRoles.includes(role) ? true : false;
    }
  };

  // Smooth Scroll on Click
  const aboutRef = useRef<HTMLDivElement>(null);
  const maps1Ref = useRef<HTMLDivElement>(null);
  const maps2Ref = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderedContent = () => {
    // LOADING STATUS
    if (pathname === null || isLoading) {
      return <LoadingStatus />;
    }

    // NORMAL PAGES
    else if (pathname === PageSelector.HomePage) {
      return (
        <React.Fragment>
          <Box ref={aboutRef}>
            <About />
          </Box>
          <Products maps1Ref={maps1Ref} maps2Ref={maps2Ref} />
          <Box ref={contactRef}>
            <Contacts page={PageSelector.HomePage} />
          </Box>
        </React.Fragment>
      );
    } else if (pathname === PageSelector.Photos) {
      return <Photos />;
    } else if (pathname === PageSelector.ClientSearch) {
      return <ClientPage_Temporary />;
    }

    // ADMIN PAGES
    else if (!isLoading) {
      if (user) {
        if (
          pathname === PageSelector.AdminSearch &&
          (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee))
        ) {
          return <AdminSearch checkRoles={checkRoles} />;
        } else if (pathname === PageSelector.AdminNewClient && checkRoles(UserRoles.Admins)) {
          return <NewClient />;
        } else if (
          pathname === PageSelector.AdminShowReservations &&
          (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee))
        ) {
          return <AdminShowReservations />;
        } else if (
          pathname === PageSelector.AdminEditReservations &&
          (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee))
        ) {
          return <AdminEditReservations checkRoles={checkRoles} user={user} />;
        } else if (
          pathname === PageSelector.AdminPersonalizedQuote &&
          (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee))
        ) {
          return <AdminPersonalizedQuotes />;
        } else if (
          pathname === PageSelector.AdminReadjustSimulate &&
          (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee))
        ) {
          return <AdminReadjustSimulate />;
        } else if (
          pathname === PageSelector.AdminReadjustClient &&
          (checkRoles(UserRoles.Admins) || checkRoles(UserRoles.Sales) || checkRoles(UserRoles.Employee))
        ) {
          return <AdminReadjustClient />;
        } else if (pathname === PageSelector.MyProfile) {
          return <MaintenancePage />;
        } else {
          return <ErrorPage page={pathname} />;
        }
      } else {
        return <ErrorPage page={pathname} />;
      }
    } else if (pathname !== null || !isLoading) {
      return <ErrorPage page={pathname} />;
    }
  };

  return (
    <Box className="flex flex-col text-white bg-black1 text-lg w-full min-h-screen relative">
      <Header
        aboutRef={aboutRef}
        contactRef={contactRef}
        maps1Ref={maps1Ref}
        maps2Ref={maps2Ref}
        scrollToSection={scrollToSection}
      />
      <Box className="flex flex-1 flex-col justify-center items-center">{renderedContent()}</Box>
      <Footer />
    </Box>
  );
}
