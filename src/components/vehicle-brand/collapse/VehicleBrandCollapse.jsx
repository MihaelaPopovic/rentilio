import React, { useState } from "react";
import { Collapse } from "antd";
import VehicleBrandFormEdit from "../form-edit/VehicleBrandFormEdit";
import VehicleBrandDelete from "../delete/VehicleBrandDelete";
import VehicleModelsTable from "../../vehicle-model/table/VehicleModelsTable";
import VehicleModelFormCreate from "../../vehicle-model/form-create/VehicleModelFormCreate";
import Loader from "../../loader/Loader";
import { getVehicleModels } from "../../../services/VehicleModelsService";

function VehicleBrandCollapse({ brand, onSave }) {
  const { Panel } = Collapse;
  const [isLoading, setIsLoading] = useState(false);

  const fetchModels = async () => {
    setIsLoading(true);
    const loadedModels = await getVehicleModels(brand.id);
    brand.models = loadedModels;
    setIsLoading(false);
  };

  const onModelSave = async () => {
    await fetchModels();
  };

  const genExtra = () => (
    <>
      <VehicleBrandFormEdit brand={brand} onSave={onSave} />
      <VehicleBrandDelete brand={brand} onSave={onSave} />
    </>
  );

  return (
    <Collapse>
      <Panel header={brand.name} extra={genExtra()}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <VehicleModelFormCreate brand={brand} onModelSave={onModelSave} />
            <VehicleModelsTable
              models={brand.models}
              brand={brand}
              onModelSave={onModelSave}
            />
          </>
        )}
      </Panel>
    </Collapse>
  );
}

export default VehicleBrandCollapse;
