import React from "react";
import VehicleBrandCollapse from "../collapse/VehicleBrandCollapse";

function VehicleBrands({ brands, onSave }) {
  return (
    <>
      {brands.map((brand) => (
        <div key={brand.id}>
          <VehicleBrandCollapse brand={brand} onSave={onSave} />
        </div>
      ))}
    </>
  );
}

export default VehicleBrands;
