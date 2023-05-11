import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "antd";
import { deleteVehicleBrand } from "./../../../services/VehicleBrandService";
import { message } from "antd";

function VehicleBrandDelete({ brand, onSave }) {
  const { confirm } = Modal;

  const handleDelete = async () => {
    try {
      message.open({
        type: "info",
        content: "Deleting brand...",
      });
      await deleteVehicleBrand(brand.id);
      message.open({
        type: "success",
        content: "Brand deleted!",
      });
    } catch (error) {
      message.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
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
