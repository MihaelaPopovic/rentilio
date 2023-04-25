import { makeAutoObservable } from "mobx";
import axios from "axios";
import { message } from "antd";
export default class VehicleModels {
  messageApi = message;
  name;
  abrv;
  seats;
  price;
  gearShift;
  fuelConsumption;

  picture;
  isLoading = false;
  constructor() {
    makeAutoObservable(this);
  }
  setName(name) {
    this.name = name;
  }
  setPicture(picture) {
    this.picture = picture;
  }
  setPrice(price) {
    this.price = price;
  }
  setSeats(seats) {
    this.seats = seats;
  }
  setAbrv(abrv) {
    this.abrv = abrv;
  }
  setGearShift(gearShift) {
    this.gearShift = gearShift;
  }
  setFuelConsumption(fuelConsumption) {
    this.fuelConsumption = fuelConsumption;
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
  storeVehicleModel = async (brandId) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Saving model...",
      });
      const data = {
        fields: {
          name: {
            stringValue: this.name,
          },
          abrv: {
            stringValue: this.abrv,
          },
          price: {
            doubleValue: this.price,
          },
          seats: {
            integerValue: this.seats,
          },
          fuelConsumption: {
            doubleValue: this.fuelConsumption,
          },
          gearShift: {
            stringValue: this.gearShift,
          },
          picture: {
            stringValue: this.picture,
          },
          vehicle_brand_id: {
            stringValue: brandId,
          },
        },
      };
      await axios.post(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models",
        data
      );
      this.messageApi.open({
        type: "success",
        content: "Model saved!",
      });
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
  editVehicleModel = async (modelId) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Updating model...",
      });
      const data = {
        fields: {
          name: {
            stringValue: this.name,
          },
          abrv: {
            stringValue: this.abrv,
          },
        },
      };
      await axios.patch(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/" +
          modelId,
        data
      );
      this.messageApi.open({
        type: "success",
        content: "Model updated!",
      });
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
  deleteVehicleModel = async (modelId) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Deleting model...",
      });
      await axios.delete(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/" +
          modelId
      );
      this.messageApi.open({
        type: "success",
        content: "Model deleted!",
      });
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
  storeImage = async (file) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Uploading image...",
      });
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "https://firebasestorage.googleapis.com/v0/b/rentilio-be577.appspot.com/o?uploadType=media&name=" +
          encodeURIComponent(file.name),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      this.messageApi.open({
        type: "success",
        content: "Image uploaded!",
      });
      this.setPicture(
        "https://firebasestorage.googleapis.com/v0/b/rentilio-be577.appspot.com/o/" +
          response.data.name +
          "?alt=media&token=" +
          response.data.downloadTokens
      );
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
}
