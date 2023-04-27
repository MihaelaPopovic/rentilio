import React, { useContext, useState } from "react";
import { Modal } from "antd";
import "./VehicleModelFormPopup.scss";
import { VehicleModelContext } from "../../../contexts/VehicleModelContext";

function VehicleModelFormPopup({
  isModalOpen,
  setIsModalOpen,
  isEditing,
  brand,
  model,
  onSave,
}) {
  const VehicleModel = useContext(VehicleModelContext);
  if(isEditing) {
    VehicleModel.name = model.name;
    VehicleModel.abrv = model.abrv;
    VehicleModel.price = model.price;
    VehicleModel.seats = model.seats;
    VehicleModel.fuelConsumption = model.fuelConsumption;
    VehicleModel.gearShift = model.gearShift;
    VehicleModel.picture = model.picture;
  }
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    VehicleModel.resetValues();
    setIsModalOpen(false);
  };
  const validateForm = () => {
    let isValid = true;
      if (!VehicleModel.name) {
        isValid = false;
        const input = document.querySelector(".name");
        input.classList.add("invalid");
      }
      if (!VehicleModel.abrv) {
        isValid = false;
        const input = document.querySelector(".abrv");
        input.classList.add("invalid");
      }
      if (!VehicleModel.price) {
        isValid = false;
        const input = document.querySelector(".price");
        input.classList.add("invalid");
      }
      if (!VehicleModel.seats) {
        isValid = false;
        const input = document.querySelector(".seats");
        input.classList.add("invalid");
      }
      if (!VehicleModel.fuelConsumption) {
        isValid = false;
        const input = document.querySelector(".fuel-consumption");
        input.classList.add("invalid");
      }
      if (!VehicleModel.gearShift) {
        isValid = false;
        const input = document.querySelector(".gear-shift");
        input.classList.add("invalid");
      }
      if (!VehicleModel.picture) {
        isValid = false;
        const input = document.querySelector(".picture");
        input.classList.add("invalid");
      }
    return isValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setConfirmLoading(true);
      if (isEditing) {
        await VehicleModel.editVehicleModel(model, brand.id);
      } else {
        await VehicleModel.storeVehicleModel(brand.id);
      }
      await onSave();
      setIsModalOpen(false);
      setConfirmLoading(false);
    }
  };
  const uploadImage = async (file) => {
    if (!file) {
      alert("Please choose a file first!");
    }
    await VehicleModel.storeImage(file);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadImage(file);
  };
  return (
    <Modal
      title={isEditing ? "Edit vehicle model" : "Add new vehicle model"}
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
            className="name"
            required
            type="string"
            defaultValue={isEditing ? model.name : VehicleModel.name}
            onChange={(e) => VehicleModel.setName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Short name * </label>
          <input
            className="abrv"
            required
            type="string"
            defaultValue={isEditing ? model.abrv : VehicleModel.abrv}
            onChange={(e) => VehicleModel.setAbrv(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Price * </label>
          <input
            className="price"
            required
            type="number"
            defaultValue={isEditing ? model.price : VehicleModel.price}
            onChange={(e) => VehicleModel.setPrice(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Seats * </label>
          <input
            className="seats"
            required
            type="number"
            defaultValue={isEditing ? model.seats : VehicleModel.seats}
            onChange={(e) => VehicleModel.setSeats(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Fuel consumption * </label>
          <input
            className="fuel-consumption"
            required
            type="number"
            defaultValue={
              isEditing ? model.fuelConsumption : VehicleModel.fuelConsumption
            }
            onChange={(e) => VehicleModel.setFuelConsumption(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label> Gear shift * </label>
          <input
            className="gear-shift"
            required
            type="string"
            defaultValue={isEditing ? model.gearShift : VehicleModel.gearShift}
            onChange={(e) => VehicleModel.setGearShift(e.target.value)}
          />
        </div>
        <div className="image-upload">
          <input className="picture" type="file" onChange={handleFileChange} />
        </div>
      </form>
    </Modal>
  );
}
export default VehicleModelFormPopup;
