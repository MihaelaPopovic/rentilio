import React, { useContext, useState, useRef } from "react";
import { Modal } from "antd";
import "./VehicleBrandFormPopup.scss";
import { VehicleBrandContext } from "../../../contexts/VehicleBrandContext";
import {
  editVehicleBrand,
  storeVehicleBrand,
} from "../../../services/VehicleBrandService";
import { message } from "antd";
function VehicleBrandFormPopup({
  isModalOpen,
  setIsModalOpen,
  isEditing,
  brand,
  onSave,
}) {
  const VehicleBrand = useContext(VehicleBrandContext);

  const nameRef = useRef();
  const abrvRef = useRef();

  if (isEditing) {
    VehicleBrand.name = brand.name;
    VehicleBrand.abrv = brand.abrv;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    VehicleBrand.resetValues();
    setIsModalOpen(false);
  };

  const validateForm = () => {
    let isValid = true;
    if (!VehicleBrand.name) {
      isValid = false;
      nameRef.current.className = "invalid";
    }
    if (!VehicleBrand.abrv) {
      isValid = false;
      abrvRef.current.className = "invalid";
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setConfirmLoading(true);
      try {
        if (isEditing) {
          message.open({
            type: "info",
            content: "Updating brand...",
          });
          await editVehicleBrand(VehicleBrand, brand.id);
          message.open({
            type: "success",
            content: "Brand updated!",
          });
        } else {
          message.open({
            type: "info",
            content: "Saving brand...",
          });
          await storeVehicleBrand(VehicleBrand);
          message.open({
            type: "success",
            content: "Brand saved!",
          });
        }
      } catch (error) {
        message.open({
          type: "warning",
          content: "Something went wrong!",
        });
      }
      VehicleBrand.resetValues();
      await onSave();
      setIsModalOpen(false);
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit vehicle brand" : "Add new vehicle brand"}
      open={isModalOpen}
      okButtonProps={{
        children: "Save",
      }}
      okText={isEditing ? "Update" : "Save"}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <form className="form">
        <div className="input-wrapper">
          <label> Name *</label>
          <input
            ref={nameRef}
            required
            type="string"
            defaultValue={isEditing ? brand.name : VehicleBrand.name}
            onChange={(e) => VehicleBrand.setName(e.target.value, nameRef)}
          />
        </div>
        <div className="input-wrapper">
          <label> Short name * </label>
          <input
            ref={abrvRef}
            required
            type="string"
            defaultValue={isEditing ? brand.abrv : VehicleBrand.abrv}
            onChange={(e) => VehicleBrand.setAbrv(e.target.value, abrvRef)}
          />
        </div>
      </form>
    </Modal>
  );
}

export default VehicleBrandFormPopup;
