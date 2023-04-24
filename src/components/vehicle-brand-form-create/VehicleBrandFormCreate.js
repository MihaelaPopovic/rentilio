import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Button } from "antd";
import "./VehicleBrandFormCreate.scss";
import VehicleFormPopup from "../vehicle-brand-form-popup/VehicleBrandFormPopup";

function VehicleBrandFormButton({ onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="btn-wrapper">
      <Button type="default" onClick={showModal}>
        <GrAdd className="icon" /> Brand
      </Button>
      {isModalOpen && (
        <VehicleFormPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isEditing={false}
          onSave={onSave}
        />
      )}
    </div>
  );
}

export default VehicleBrandFormButton;
