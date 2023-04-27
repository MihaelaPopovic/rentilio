import React from "react";
import { Collapse } from "antd";
import VehicleBrandFormEdit from "../form-edit/VehicleBrandFormEdit";
import VehicleBrandDelete from "../delete/VehicleBrandDelete";
import VehicleModelsTable from "../../vehicle-model/table/VehicleModelsTable";
import VehicleModelFormCreate from "../../vehicle-model/form-create/VehicleModelFormCreate";

function VehicleBrandCollapse({ brand, onSave }) {
  const { Panel } = Collapse;

  const genExtra = () => (
    <>
      <VehicleBrandFormEdit brand={brand} onSave={onSave} />
      <VehicleBrandDelete brand={brand} onSave={onSave} />
    </>
  );
  
  return (
    <Collapse>
      <Panel header={brand.name} extra={genExtra()}>
        <VehicleModelFormCreate brand={brand} />
        <VehicleModelsTable models={brand.models} />
      </Panel>
    </Collapse>
  );
}

export default VehicleBrandCollapse;
