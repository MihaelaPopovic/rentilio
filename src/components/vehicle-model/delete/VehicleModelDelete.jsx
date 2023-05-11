import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { deleteVehicleModel } from "../../../services/VehicleModelsService";
import { message } from "antd";

function VehicleModelDelete({ model, onModelSave }) {
  const { confirm } = Modal;

  const handleDelete = async () => {
    try {
      message.open({
        type: "info",
        content: "Deleting model...",
      });
      await deleteVehicleModel(model.key);
      message.open({
        type: "success",
        content: "Model deleted!",
      });
    } catch (error) {
      message.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
    await deleteVehicleModel(model.key);
    await onModelSave();
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
