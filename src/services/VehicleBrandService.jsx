import axios from "axios";
import { message } from "antd";

async function getVehicleBrands() {
  try {
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
        modelResponse.data.map((data) => {
          const model = {
            id: data.document.name.split("/").pop(),
            name: data.document.fields.name.stringValue,
            abrv: data.document.fields.abrv.stringValue,
            seats: data.document.fields.seats.integerValue,
            fuelConsumption: data.document.fields.fuelConsumption.doubleValue,
            gearShift: data.document.fields.gearShift.stringValue,
            picture: data.document.fields.picture.stringValue,
            price: data.document.fields.price.doubleValue,
          };
          brand.models.push(model);
        });
      }
    }
    return brandsData;
  } catch (error) {
    message.open({
      type: "warning",
      content: "Something went wrong!",
    });
  }
}
async function storeVehicleBrand(brand) {

  const data = {
    fields: {
      name: {
        stringValue: brand.name,
      },
      abrv: {
        stringValue: brand.abrv,
      },
    },
  };
  await axios.post(
    "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands",
    data
  );

}
async function editVehicleBrand(brand, brandId) {

  const data = {
    fields: {
      name: {
        stringValue: brand.name,
      },
      abrv: {
        stringValue: brand.abrv,
      },
    },
  };
  await axios.patch(
    "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands/" +
      brandId,
    data
  );

}
async function deleteVehicleBrand(brandId) {
  await axios.delete(
    "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_brands/" +
      brandId
  );
}

export {
  getVehicleBrands,
  storeVehicleBrand,
  editVehicleBrand,
  deleteVehicleBrand,
};
