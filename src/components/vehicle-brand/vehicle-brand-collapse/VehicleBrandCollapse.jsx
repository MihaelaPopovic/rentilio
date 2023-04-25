import React from "react";
import { Collapse } from "antd";
import "./VehicleBrandCollapse.scss";
import VehicleBrandFormEdit from "../vehicle-brand-form-edit/VehicleBrandFormEdit";
import VehicleBrandDelete from "../vehicle-brand-delete/VehicleBrandDelete";
import VehicleModelsTable from "../../vehicle-model/vehicle-models-table/VehicleModelsTable";
import VehicleModelFormCreate from "../../vehicle-model/vehicle-model-form-create/VehicleModelFormCreate";

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
