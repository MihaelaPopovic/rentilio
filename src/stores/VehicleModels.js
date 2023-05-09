import {
  makeObservable,
  observable,
  action
} from "mobx";
import axios from "axios";
import {
  message
} from "antd";
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

  constructor(name, abrv, seats, price, gearShift, fuelConsumption, picture) {
    this.name = name;
    this.abrv = abrv;
    this.seats = seats;
    this.price = price;
    this.gearShift = gearShift;
    this.fuelConsumption = fuelConsumption;
    this.picture = picture;
    makeObservable(this, {
      name: observable,
      abrv: observable,
      seats: observable,
      price: observable,
      gearShift: observable,
      fuelConsumption: observable,
      picture: observable,
      setName: action,
      setPicture: action,
      setPrice: action,
      setSeats: action,
      setAbrv: action,
      setGearShift: action,
      setFuelConsumption: action,
      setIsLoading: action,
    })
  }

  setName(name, nameRef) {
    this.name = name;
    if (nameRef.current.classList.contains('invalid')) {
      nameRef.current.classList.remove("invalid");
    }
  }

  setPicture(picture, pictureRef) {
    this.picture = picture;
    if (pictureRef.current.classList.contains('invalid')) {
      pictureRef.current.classList.remove("invalid");
    }
  }

  setPrice(price, priceRef) {
    this.price = price;
    if (priceRef.current.classList.contains('invalid')) {
      priceRef.current.classList.remove("invalid");
    }
  }

  setSeats(seats, seatsRef) {
    this.seats = seats;
    if (seatsRef.current.classList.contains('invalid')) {
      seatsRef.current.classList.remove("invalid");
    }
  }

  setAbrv(abrv, abrvRef) {
    this.abrv = abrv;
    if (abrvRef.current.classList.contains('invalid')) {
      abrvRef.current.classList.remove("invalid");
    }
  }

  setGearShift(gearShift, gearShiftRef) {
    this.gearShift = gearShift;
    if (gearShiftRef.current.classList.contains('invalid')) {
      gearShiftRef.current.classList.remove("invalid");
    }
  }

  setFuelConsumption(fuelConsumption, fuelConsumptionRef) {
    this.fuelConsumption = fuelConsumption;
    if (fuelConsumptionRef.current.classList.contains('invalid')) {
      fuelConsumptionRef.current.classList.remove("invalid");
    }
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  resetValues() {
    this.name = '';
    this.picture = '';
    this.price = '';
    this.seats = '';
    this.abrv = '';
    this.gearShift = '';
    this.fuelConsumption = '';
  }

  getVehicleModels = async (brandId) => {
    try {
      this.setIsLoading(true);
      const runQuery = {
        structuredQuery: {
          from: [{
            collectionId: "vehicle_models",
          }, ],
          where: {
            fieldFilter: {
              field: {
                fieldPath: "vehicle_brand_id",
              },
              op: "EQUAL",
              value: {
                stringValue: brandId,
              },
            },
          },
          select: {
            fields: [{
                fieldPath: "id",
              },
              {
                fieldPath: "name",
              },
              {
                fieldPath: "abrv",
              },
              {
                fieldPath: "seats",
              },
              {
                fieldPath: "gearShift",
              },
              {
                fieldPath: "fuelConsumption",
              },
              {
                fieldPath: "picture",
              },
              {
                fieldPath: "price",
              },
            ],
          },
        },
      };
      const modelResponse = await axios.post(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents:runQuery",
        runQuery
      );
      if (modelResponse.data[0].document) {
        const models = modelResponse.data.map((data) => {
          return {
            id: data.document.name.split("/").pop(),
            name: data.document.fields.name.stringValue,
            abrv: data.document.fields.abrv.stringValue,
            seats: data.document.fields.seats.integerValue,
            fuelConsumption: data.document.fields.fuelConsumption.doubleValue,
            gearShift: data.document.fields.gearShift.stringValue,
            picture: data.document.fields.picture.stringValue,
            price: data.document.fields.price.doubleValue,
          };
        });
        this.setIsLoading(false);
        return models;
      } else {
        this.setIsLoading(false);
        return [];
      }
    } catch (error) {
      this.setIsLoading(false);
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
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
      this.resetValues();

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

  editVehicleModel = async (model, brandId) => {
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
          price: {
            doubleValue: this.price,
          },
          vehicle_brand_id: {
            stringValue: brandId,
          },
        },
      };
      await axios.patch(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/" +
        model.key,
        data
      );
      this.resetValues();

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

  storeImage = async (file, pictureRef) => {
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
        formData, {
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
        response.data.downloadTokens,
        pictureRef
      );
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
}