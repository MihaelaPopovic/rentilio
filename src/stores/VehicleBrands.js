import { makeAutoObservable, action } from "mobx";
import axios from "axios";
export default class VehicleBrands {
  name;
  abrv;
  isLoading = true;
  constructor() {
    makeAutoObservable(this, {
      getVehicleBrands: action,
    });
  }
  setName(name) {
    this.name = name;
  }
  setAbrv(abrv) {
    this.abrv = abrv;
  }
  setError(error) {
    this.error = error;
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
                  fieldPath: "doors",
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
              doors: data.document.fields.doors.integerValue,
            };
          });
          brand.models = models;
        }
      }
      this.setIsLoading(false);

      return brandsData;
    } catch (error) {
      this.setError(error.message);
      this.setIsLoading(false);
      return [];
    }
  };
  storeVehicleBrand = async () => {
    try {
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
    } catch (error) {
      this.setError(error.message);
    }
  };
  editVehicleBrand = async (brandId) => {
    try {
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
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands/"+brandId,
        data
      );
    } catch (error) {
      this.setError(error.message);
    }
  };
  deleteVehicleBrand = async (brandId) => {
    try {
      this.setIsLoading(true);
      await axios.delete(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands/"+brandId);
        this.setIsLoading(false);
    
      } catch (error) {
        this.setIsLoading(false);

      this.setError(error.message);
    }
  };
}
