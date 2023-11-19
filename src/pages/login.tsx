import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminPageLogin from "@/components/admin/AdminPageLogin";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import { useAdminsData } from "@/context/AdminsDataContext";
import { AdminsDataInterface, PageSelector } from "@/types";
import Head from "next/head";
import { useState } from "react";

export default function Login() {
  const { adminsData, adminLogin } = useAdminsData();
  const [searchError, setSearchError] = useState<boolean>(false);
  const [checkRemember, setCheckRemember] = useState<boolean>(false);

  const searchAdmin =
    adminsData &&
    Object.values(adminsData).filter((admin: AdminsDataInterface) => {
      if (adminLogin.cpf === admin.cpf) {
        if (adminLogin.password === admin.password) {
          if (checkRemember) {
            window.localStorage.setItem(
              "USER_CREDENTIALS",
              JSON.stringify({ cpf: admin.cpf, password: admin.password, checkRemember: checkRemember })
            );
          }
          return admin.name;
        }
      }
    });

  const handleError = () => {
    if (searchAdmin?.length === 0) {
      setSearchError(true);
    } else {
      setSearchError(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black1 text-lg text-white">
      <div className="w-full h-full">
        <Head>
          <title>Login - Administração</title>
        </Head>
        <Header page={PageSelector.AdminLogin} handleError={handleError} />
      </div>
      <div className="flex flex-col m-auto py-6 items-center">
        {searchAdmin?.length === 0 ? (
          <AdminPageLogin
            checkRemember={checkRemember}
            setCheckRemember={setCheckRemember}
            searchError={searchError}
            handleError={handleError}
          />
        ) : searchAdmin?.length === 1 ? (
          <div className="flex flex-col items-center pb-10">
            <AdminDashboard />
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
