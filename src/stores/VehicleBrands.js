import {
  makeObservable,
  observable,
  action
} from "mobx";

export default class VehicleBrands {
  name;
  abrv;

  constructor(name, abrv) {
    this.name = name;
    this.abrv = abrv;
    makeObservable(this, {
      name: observable,
      abrv: observable,
      setName: action,
      setAbrv: action
    })
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
  resetValues() {
    this.name = "";
    this.abrv = "";
  }
}