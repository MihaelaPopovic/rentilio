import { database } from "./../firebase";
import { makeAutoObservable } from "mobx";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";
export default class VehicleBrands {
  vehicleBrand = {
    name: "",
    abrv: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  setName(name) {
    this.vehicleBrand.name = name;
  }
  setAbrv(abrv) {
    this.vehicleBrand.abrv = abrv;
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
      brandsData.map(async (brand) => {
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
         const models = modelResponse.data.map((data) => {
            return {
              id: data.document.name.split("/").pop(),
              name: data.document.fields.name.stringValue,
              abrv: data.document.fields.abrv.stringValue,
              doors: data.document.fields.doors.integerValue,
            };
          });
          brand.models = models;
      });
      this.setIsLoading(false);

      return brandsData;
    } catch (error) {
      this.setError(error.message);
      this.setIsLoading(false);
      return [];
    }
  };
  storeVehicle = async () => {
    try {
      this.setIsLoading(true);
      const collectionRef = collection(database, "vehicle_models");
      addDoc(collectionRef, {
        name: "X5",
        abrv: "X5",
        doors: 5,
        vehicle_brand_id: "5dorXId2M8vUEERCDWyi",
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      this.setIsLoading(false);
    } catch (error) {
      this.setError(error.message);
      this.setIsLoading(false);
    }
  };
}
