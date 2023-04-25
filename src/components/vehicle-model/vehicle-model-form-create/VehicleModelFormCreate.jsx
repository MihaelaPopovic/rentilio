import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Button } from "antd";
import VehicleModelFormPopup from "../vehicle-model-form-popup/VehicleModelFormPopup";

function VehicleModelFormCreate({ brand }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <div className="btn-wrapper">
      <Button type="default" onClick={showModal}>
        <GrAdd className="icon" /> Model{" "}
      </Button>{" "}
      {isModalOpen && (
        <VehicleModelFormPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isEditing={false}
          brand={brand}
        />
      )}{" "}
    </div>
  );
}

export default VehicleModelFormCreate;
