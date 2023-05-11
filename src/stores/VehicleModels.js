import {
  makeObservable,
  observable,
  action
} from "mobx";
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
    })
  }

  setName(name, nameRef) {
    this.name = name;
    if (nameRef.current.classList.contains('invalid')) {
      nameRef.current.classList.remove("invalid");
    }
  }

  setPicture(picture, pictureRef) {
    console.log(picture);
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
  resetValues() {
    this.name = '';
    this.picture = '';
    this.price = '';
    this.seats = '';
    this.abrv = '';
    this.gearShift = '';
    this.fuelConsumption = '';
  }
}