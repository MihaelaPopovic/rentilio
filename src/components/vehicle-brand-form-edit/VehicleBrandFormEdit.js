import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import VehicleFormPopup from "../vehicle-brand-form-popup/VehicleBrandFormPopup";

function VehicleBrandFormEditButton({ brand, onSave }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <FiEdit2
        className="font-size"
        onClick={(event) => {
          event.stopPropagation();
          setIsEditModalOpen(true);
        }}
      />
      {isEditModalOpen && (
        <VehicleFormPopup
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          isEditing={true}
          brand={brand}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default VehicleBrandFormEditButton;
