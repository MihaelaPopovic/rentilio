import { makeAutoObservable } from "mobx";
export default class VehicleModels {
  vehicleModel = {
    name: "",
    picture: "",
    doors: 0,
    abrv: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  setName(name) {
    this.vehicleModel.name = name;
  }
  setPicture(picture) {
    this.vehicleModel.picture = picture;
  }
  setDoors(doors) {
    this.vehicleModel.doors = doors;
  }
  setAbrv(abrv) {
    this.vehicleModel.abrv = abrv;
  }
}
