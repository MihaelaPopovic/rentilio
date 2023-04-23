import "./VehicleBrandCollapse.scss";
import React, {  useEffect} from "react";
import { Collapse } from "antd";
import { FiSettings } from "react-icons/fi";

const VehicleBrandCollapse = ({ brand}) => {
    useEffect(() => {console.log(brand)}, [brand])
  const { Panel } = Collapse;
  const genExtra = () => (

    <FiSettings
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );
  return (
    <Collapse>
      <Panel header={brand.name}  extra={genExtra()}>
        {brand.models.map((model) => (
            <div key={model.id}>

            <p>{model.name}</p>
            <p>{model.abrv}</p>
          
            </div>
        ))}

      </Panel>
    </Collapse>
  );
};

export default VehicleBrandCollapse;
