import React from "react";
import VehicleModel from "./../stores/VehicleModels";

export const VehicleModelContext = React.createContext(new VehicleModel());

export function VehicleModelProvider({ children }) {
  return (
    <VehicleModelContext.Provider value={new VehicleModel()}>
      {children}
    </VehicleModelContext.Provider>
  );
}
