import React, { useEffect, useState } from "react";
import "./AdminDashboard.scss";
import VehicleBrands from "../../components/vehicle-brand/brands/VehicleBrands";
import VehicleBrandFormCreate from "../../components/vehicle-brand/form-create/VehicleBrandFormCreate";
import Loader from "../../components/loader/Loader";
import { getVehicleBrands } from "../../services/VehicleBrandService";
function AdminDashboard() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState();

  async function fetchData() {
    try {
      setIsLoading(true);
      const loadedBrands = await getVehicleBrands();
      setBrands(loadedBrands);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

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
