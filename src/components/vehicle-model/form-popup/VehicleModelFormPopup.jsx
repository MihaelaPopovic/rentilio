import React, { useContext, useState, useRef } from "react";
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

  const nameRef = useRef();
  const abrvRef = useRef();
  const priceRef = useRef();
  const seatsRef = useRef();
  const fuelConsumptionRef = useRef();
  const gearShiftRef = useRef();
  const pictureRef = useRef();

  if (isEditing) {
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
      nameRef.current.classList.add("invalid");
    }
    if (!VehicleModel.abrv) {
      isValid = false;
      abrvRef.current.classList.add("invalid");
    }
    if (!VehicleModel.price) {
      isValid = false;
      priceRef.current.classList.add("invalid");
    }
    if (!VehicleModel.seats) {
      isValid = false;
      seatsRef.current.classList.add("invalid");
    }
    if (!VehicleModel.fuelConsumption) {
      isValid = false;
      fuelConsumptionRef.current.classList.add("invalid");
    }
    if (!VehicleModel.gearShift) {
      isValid = false;
      gearShiftRef.current.classList.add("invalid");
    }
    if (!VehicleModel.picture) {
      isValid = false;
      pictureRef.current.classList.add("invalid");
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
    await VehicleModel.storeImage(file, pictureRef);
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
            ref={nameRef}
            required
            type="string"
            defaultValue={isEditing ? model.name : VehicleModel.name}
            onChange={(e) => VehicleModel.setName(e.target.value, nameRef)}
          />
        </div>
        <div className="input-wrapper">
          <label> Short name * </label>
          <input
            ref={abrvRef}
            required
            type="string"
            defaultValue={isEditing ? model.abrv : VehicleModel.abrv}
            onChange={(e) => VehicleModel.setAbrv(e.target.value, abrvRef)}
          />
        </div>
        <div className="input-wrapper">
          <label> Price * </label>
          <input
            ref={priceRef}
            required
            type="number"
            defaultValue={isEditing ? model.price : VehicleModel.price}
            onChange={(e) => VehicleModel.setPrice(e.target.value, priceRef)}
          />
        </div>
        <div className="input-wrapper">
          <label> Seats * </label>
          <input
            ref={seatsRef}
            required
            type="number"
            defaultValue={isEditing ? model.seats : VehicleModel.seats}
            onChange={(e) => VehicleModel.setSeats(e.target.value, seatsRef)}
          />
        </div>
        <div className="input-wrapper">
          <label> Fuel consumption * </label>
          <input
            ref={fuelConsumptionRef}
            required
            type="number"
            defaultValue={
              isEditing ? model.fuelConsumption : VehicleModel.fuelConsumption
            }
            onChange={(e) =>
              VehicleModel.setFuelConsumption(
                e.target.value,
                fuelConsumptionRef
              )
            }
          />
        </div>
        <div className="input-wrapper">
          <label> Gear shift * </label>
          <input
            ref={gearShiftRef}
            required
            type="string"
            defaultValue={isEditing ? model.gearShift : VehicleModel.gearShift}
            onChange={(e) =>
              VehicleModel.setGearShift(e.target.value, gearShiftRef)
            }
          />
        </div>
        <div className="image-upload">
          <input ref={pictureRef} type="file" onChange={handleFileChange} />
        </div>
      </form>
    </Modal>
  );
}
export default VehicleModelFormPopup;
