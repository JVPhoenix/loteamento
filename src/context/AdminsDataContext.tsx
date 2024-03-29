import { AdminsDataContextType, AdminsDataInterface } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

// contexto criado
export const AdminsDataContext = createContext<AdminsDataContextType>({
  adminsData: [{ name: "", cpf: "", password: "" }],
  searchAdmin: [{ name: "", cpf: "", password: "" }],
  adminLogin: { cpf: "", password: "" },
  setAdminLogin: () => undefined,
});

// usar o contexto criado
export const useAdminsData = () => {
  return useContext(AdminsDataContext);
};

// react func do context
export function AdminsDataContextProvider(props: React.PropsWithChildren) {
  const [adminsData, setAdminsData] = useState<AdminsDataInterface[] | null>(null);
  const [adminLogin, setAdminLogin] = useState<{ cpf: string; password: string }>({
    cpf: "",
    password: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ADMINS_API_LINK}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data: AdminsDataInterface[]) => {
        setAdminsData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const searchAdmin =
    adminsData &&
    Object.values(adminsData).filter((admin: AdminsDataInterface) => {
      if (adminLogin.cpf === admin.cpf) {
        if (adminLogin.password === admin.password) {
          return admin.name;
        }
      }
    });

  return (
    <AdminsDataContext.Provider value={{ adminsData, searchAdmin, adminLogin, setAdminLogin }}>
      {props.children}
    </AdminsDataContext.Provider>
  );
}
