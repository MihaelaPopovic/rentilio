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
async function filterBy(search, nextToken) {
  const query = {
    structuredQuery: {
      from: [{ collectionId: "vehicle_models" }],
      where: {
        compositeFilter: {
          op: "OR",
          filters: [
            {
              fieldFilter: {
                field: { fieldPath: "name" },
                op: "array-contains",
                value: { stringValue: search },
              },
            },
          ],
        },
      },
    },
  };
 
  const modelResponse = await axios.post("https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents:runQuery", query);
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
  return {
    models: models,
    nextPageToken: modelResponse.data.nextPageToken,
  };
}
async function orderBy(sortBy, nextToken) {
  let key;
  let direction;
  switch (sortBy) {
    case "priceAscending":
      key = "price";
      direction = "asc";
      break;
    case "priceDescending":
      key = "price";
      direction = "desc";
      break;
    case "nameAscending":
      key = "name";
      direction = "asc";
      break;
    case "nameDescending":
      key = "name";
      direction = "desc";
      break;
    default:
      return;
  }
  let url = "";
  if (nextToken === "") {
    url =
      "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/?orderBy=" +
      key +
      "%20" +
      direction +
      "&pageSize=6";
  } else {
    url =
      "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/?orderBy=" +
      key +
      "%20" +
      direction +
      "&pageSize=6&pageToken=" +
      nextToken;
  }
  const modelResponse = await axios.get(url);
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
  return {
    models: models,
    nextPageToken: modelResponse.data.nextPageToken,
  };
}
async function getPaginateModels(nextToken) {
  let apiUrl;
  if (nextToken) {
    apiUrl =
      "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/?pageSize=6&pageToken=" +
      nextToken;
  } else {
    apiUrl =
      "https://firestore.googleapis.com/v1/projects/rentilio-be577/databases/(default)/documents/vehicle_models/?pageSize=6";
  }
  const modelResponse = await axios.get(apiUrl);
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
  return {
    models: models,
    nextPageToken: modelResponse.data.nextPageToken,
  };
}
async function getAllModels() {
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
}

export {
  getVehicleModels,
  storeVehicleModel,
  editVehicleModel,
  deleteVehicleModel,
  storeImage,
  orderBy,
  getPaginateModels,
  getAllModels,
  filterBy
};
