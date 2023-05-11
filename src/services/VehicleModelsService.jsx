import axios from "axios";
import { message } from "antd";

async function getVehicleModels(brandId) {
  try {
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
              stringValue: brandId,
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
      return models;
    } else {
      return [];
    }
  } catch (error) {
    message.open({
      type: "warning",
      content: "Something went wrong!",
    });
  }
}
async function storeVehicleModel(model, brandId) {
  const data = {
    fields: {
      name: {
        stringValue: model.name,
      },
      abrv: {
        stringValue: model.abrv,
      },
      price: {
        doubleValue: model.price,
      },
      seats: {
        integerValue: model.seats,
      },
      fuelConsumption: {
        doubleValue: model.fuelConsumption,
      },
      gearShift: {
        stringValue: model.gearShift,
      },
      picture: {
        stringValue: model.picture,
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
}
async function editVehicleModel(model, modelId, brandId) {
  const data = {
    fields: {
      name: {
        stringValue: model.name,
      },
      abrv: {
        stringValue: model.abrv,
      },
      seats: {
        integerValue: model.seats,
      },
      fuelConsumption: {
        doubleValue: model.fuelConsumption,
      },
      gearShift: {
        stringValue: model.gearShift,
      },
      picture: {
        stringValue: model.picture,
      },
      price: {
        doubleValue: model.price,
      },
      vehicle_brand_id: {
        stringValue: brandId,
      },
    },
  };
  await axios.patch(
    "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/" +
      modelId,
    data
  );
}
async function deleteVehicleModel(modelId) {
  await axios.delete(
    "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/" +
      modelId
  );
}
async function storeImage(file) {
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
  return (
    "https://firebasestorage.googleapis.com/v0/b/rentilio-be577.appspot.com/o/" +
    response.data.name +
    "?alt=media&token=" +
    response.data.downloadTokens
  );
}
async function orderBy(key, direction) {
  try {
    let modelResponse;
    if (this.lastVehicleModelName === "") {
      modelResponse = await axios.get(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/?orderBy=" +
          key +
          "%20" +
          direction +
          "&pageSize=6"
      );
    } else {
      modelResponse = await axios.get(
        "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/?orderBy=" +
          key +
          "%20" +
          direction +
          "&pageSize=6&pageToken=" +
          this.lastVehicleModelName
      );
    }
    this.lastVehicleModelName = modelResponse.data.nextPageToken;
    const models = modelResponse.data.documents.map((data) => {
      const model = {
        id: data.name.split("/").pop(),
        name: data.fields.name.stringValue,
        abrv: data.fields.abrv.stringValue,
        seats: data.fields.seats.integerValue,
        fuelConsumption: data.fields.fuelConsumption.doubleValue,
        gearShift: data.fields.gearShift.stringValue,
        picture: data.fields.picture.stringValue,
        price: data.fields.price.doubleValue,
      };
      return model;
    });
    return models;
  } catch (error) {
    this.messageApi.open({
      type: "warning",
      content: "Something went wrong!",
    });
  }
}
async function getAllModels() {
  try {
    const modelResponse = await axios.get(
      "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models"
    );
    const models = modelResponse.data.documents.map((data) => {
      const model = {
        id: data.name.split("/").pop(),
        name: data.fields.name.stringValue,
        abrv: data.fields.abrv.stringValue,
        seats: data.fields.seats.integerValue,
        fuelConsumption: data.fields.fuelConsumption.doubleValue,
        gearShift: data.fields.gearShift.stringValue,
        picture: data.fields.picture.stringValue,
        price: data.fields.price.doubleValue,
      };
      return model;
    });
    return models;
  } catch (error) {
    this.messageApi.open({
      type: "warning",
      content: "Something went wrong!",
    });
  }
}

export {
  getVehicleModels,
  storeVehicleModel,
  editVehicleModel,
  deleteVehicleModel,
  storeImage,
  orderBy,
  getAllModels,
};
