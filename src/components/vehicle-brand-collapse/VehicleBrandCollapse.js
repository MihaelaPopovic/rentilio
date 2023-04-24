import React from "react";
import { Collapse } from "antd";
import "./VehicleBrandCollapse.scss";
import VehicleBrandFormEdit from "../vehicle-brand-form-edit/VehicleBrandFormEdit";
import VehicleBrandDelete from "../vehicle-brand-delete/VehicleBrandDelete";

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
        {brand.models.map((model) => (
          <div key={model.id}>
            <p> {model.name} </p> <p> {model.abrv} </p>
          </div>
        ))}
      </Panel>
    </Collapse>
  );
}

export default VehicleBrandCollapse;
