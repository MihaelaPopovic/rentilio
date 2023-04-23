import "./VehicleBrands.scss";
import React, { useContext, useEffect, useState } from "react";
import { VehicleBrandContext } from "./../../contexts/VehicleBrandContext";
import Loader from "./../loader/Loader";
import VehicleBrandCollapse from "./../vehicle-brand-collapse/VehicleBrandCollapse";
const VehicleBrands = () => {
  const { getVehicleBrands} = useContext(VehicleBrandContext);
  const [brands, setBrands] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = async () => {
    setIsLoading(true);
    const loadedBrands = await getVehicleBrands();
    console.log(loadedBrands);
    setIsLoading(false);
    setBrands(loadedBrands);
  }
  useEffect(() => {
    fetchData();
  }, [getVehicleBrands]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        brands.map((brand) => <VehicleBrandCollapse brand={brand} key={brand.id} />)
      )}
    </div>
  );
};

export default VehicleBrands;
