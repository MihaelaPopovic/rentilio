import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { VehicleBrandContext } from "../../../contexts/VehicleBrandContext";

function VehicleBrandDelete({ brand, onSave }) {
  const { confirm } = Modal;
  const { deleteVehicleBrand } = useContext(VehicleBrandContext);

  const handleDelete = async () => {
    await deleteVehicleBrand(brand.id);
    await onSave();
  };
  
  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these brand?",
      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <>
      <AiOutlineDelete
        className="font-size"
        onClick={(event) => {
          event.stopPropagation();
          showConfirm();
        }}
      />
    </>
  );
}

export default VehicleBrandDelete;
