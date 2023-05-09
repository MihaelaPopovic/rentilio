import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { Button } from "antd";
import "./VehicleBrandFormCreate.scss";
import VehicleBrandFormPopup from "../form-popup/VehicleBrandFormPopup";

function VehicleBrandFormButton({ onSave }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="btn-wrapper">
      <Button type="default"   onClick={(event) => {
          event.stopPropagation();
          setIsModalOpen(true);
        }}>
        <GrAdd className="icon" /> Brand
      </Button>
      {isModalOpen && (
        <VehicleBrandFormPopup
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
