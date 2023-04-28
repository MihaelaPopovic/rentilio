import React, { useContext, useEffect, useState } from "react";
import "./AdminDashboard.scss";
import { VehicleBrandContext } from "../../contexts/VehicleBrandContext";
import VehicleBrands from "../../components/vehicle-brand/brands/VehicleBrands";
import VehicleBrandFormCreate from "../../components/vehicle-brand/form-create/VehicleBrandFormCreate";
import Loader from "../../components/loader/Loader";

function AdminDashboard() {
  const { getVehicleBrands, isLoading } = useContext(VehicleBrandContext);
  const [brands, setBrands] = useState();

  const fetchData = async () => {
    const loadedBrands = await getVehicleBrands();
    setBrands(loadedBrands);
  };
  
  const handleSave = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [getVehicleBrands]);

  return (
    <div className="wrapper">
      <div className="width-wrapper column">
        <h2>Vehicles</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="vehicles">
            <VehicleBrandFormCreate onSave={handleSave} />
            <VehicleBrands brands={brands} onSave={handleSave} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
