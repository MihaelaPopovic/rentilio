import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { VehicleModelContext } from "../../../contexts/VehicleModelContext";

function VehicleModelDelete({ model }) {
  const { confirm } = Modal;
  const { deleteVehicleModel } = useContext(VehicleModelContext);

  const handleDelete = async () => {
    await deleteVehicleModel(model.key);
  };
  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these model?",
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

export default VehicleModelDelete;
