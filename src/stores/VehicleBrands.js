import {
  makeAutoObservable
} from "mobx";
import axios from "axios";
import {
  message
} from "antd";

export default class VehicleBrands {
  messageApi = message;
  name;
  abrv;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }
  setName(name, nameRef) {
    this.name = name;
    if (nameRef.current.classList.contains('invalid')) {
      nameRef.current.classList.remove("invalid");
    }
  }
  setAbrv(abrv, abrvRef) {
    this.abrv = abrv;
    if (abrvRef.current.classList.contains('invalid')) {
      abrvRef.current.classList.remove("invalid");
    }
  }
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }
  resetValues() {
    this.name = '';
    this.abrv = '';
  }
  getVehicleBrands = async (returnModels) => {
    try {
      this.setIsLoading(true);
      const brandsResponse = await axios.get(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands"
      );

      const brandsData = brandsResponse.data.documents.map(
        ({
          name,
          fields
        }) => ({
          id: name.split("/").pop(),
          name: fields.name.stringValue,
          abrv: fields.abrv.stringValue,
          models: [],
        })
      );
      const formattedModels = [];
      for (let brand of brandsData) {
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
                  stringValue: brand.id,
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
            const {
              name,
              abrv,
              seats,
              fuelConsumption,
              gearShift,
              picture,
              price
            } = data.document.fields;
            const id = data.document.name.split("/").pop();
            const model = {
              id,
              name: name.stringValue,
              abrv: abrv.stringValue,
              seats: seats.integerValue,
              fuelConsumption: fuelConsumption.doubleValue,
              gearShift: gearShift.stringValue,
              picture: picture.stringValue,
              price: price.doubleValue
            };
            if (returnModels) {
              model.brand = brand;
              return model;
            } else {
              brand.models.push(model);
            }
          });
          if (returnModels) {
            formattedModels.push(models);
          }
        }
      }
      this.setIsLoading(false);
      if (returnModels) {
        return formattedModels.flat();
      } else {
        return brandsData;
      }
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
      this.resetValues();
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
  editVehicleBrand = async (brand) => {
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
        brand.id,
        data
      );
      this.resetValues();
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