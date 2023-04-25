import { makeAutoObservable } from "mobx";
import axios from "axios";
import { message } from "antd";

export default class VehicleBrands {
  messageApi = message;
  name;
  abrv;
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }
  setName(name) {
    this.name = name;
  }
  setAbrv(abrv) {
    this.abrv = abrv;
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
  getVehicleBrands = async () => {
    try {
      this.setIsLoading(true);
      const brandsResponse = await axios.get(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands"
      );

      const brandsData = brandsResponse.data.documents.map(
        ({ name, fields }) => ({
          id: name.split("/").pop(),
          name: fields.name.stringValue,
          abrv: fields.abrv.stringValue,
          models: [],
        })
      );
      for (let brand of brandsData) {
        const runQuery = {
          structuredQuery: {
            from: [
              {
                collectionId: "vehicle_models",
              },
            ],
            where: {
              fieldFilter: {
                field: {
                  fieldPath: "vehicle_brand_id",
                },
                op: "EQUAL",
                value: {
                  stringValue: brand.id,
                },
              },
            },
            select: {
              fields: [
                {
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
          brand.models = models;
        }
      }
      this.setIsLoading(false);

      return brandsData;
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
  storeVehicleBrand = async () => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Saving brand...",
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
      await axios.post(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands",
        data
      );
      this.messageApi.open({
        type: "success",
        content: "Brand saved!",
      });
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
  editVehicleBrand = async (brandId) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Updating brand...",
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
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands/" +
          brandId,
        data
      );
      this.messageApi.open({
        type: "success",
        content: "Brand updated!",
      });
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
  deleteVehicleBrand = async (brandId) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Deleting brand...",
      });
      await axios.delete(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands/" +
          brandId
      );
      this.setIsLoading(false);
      this.messageApi.open({
        type: "success",
        content: "Brand deleted!",
      });
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
    }
  };
}
