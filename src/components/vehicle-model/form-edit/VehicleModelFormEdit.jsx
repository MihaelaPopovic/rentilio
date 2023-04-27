import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

import VehicleModelFormPopup from "../form-popup/VehicleModelFormPopup";

function VehicleModelFormEdit({ model, brand}) {
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
        <VehicleModelFormPopup
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          isEditing={true}
          brand={brand}
          model={model}
        />
      )}
    </>
  );
}
export default VehicleModelFormEdit;
