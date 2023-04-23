import React from 'react';
import VehicleBrand from './../stores/VehicleBrands';

export const VehicleBrandContext = React.createContext(new VehicleBrand());

export const VehicleBrandProvider = ({ children }) => {
  return (
    <VehicleBrandContext.Provider value={new VehicleBrand()}>
      {children}
    </VehicleBrandContext.Provider>
  );
};