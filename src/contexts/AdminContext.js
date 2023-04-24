import React from "react";
import Admin from "./../stores/Admin";

export const AdminContext = React.createContext(new Admin());

export function AdminProvider({ children }) {
  return (
    <AdminContext.Provider value={new Admin()}>
      {children}
    </AdminContext.Provider>
  );
}
