import React from "react";
import { Table, Space } from "antd";
import VehicleModelDelete from "../delete/VehicleModelDelete";
import VehicleModelFormEdit from "../form-edit/VehicleModelFormEdit";

function VehicleModelsTable({ models, brand }) {
  const dataSource = models.map((model) => {
    return {
      key: model.id,
      name: model.name,
      abrv: model.abrv,
      seats: model.seats,
      price: model.price,
      gearShift: model.gearShift,
      fuelConsumption: model.fuelConsumption,
      picture: model.picture
    };
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Abrv",
      dataIndex: "abrv",
      key: "abrv",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Gear shift",
      dataIndex: "gearShift",
      key: "gearShift",
    },
    {
      title: "Fuel consumption",
      dataIndex: "fuelConsumption",
      key: "fuelConsumption",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <VehicleModelFormEdit model={record} brand={brand}/>
          <VehicleModelDelete model={record} />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default VehicleModelsTable;
