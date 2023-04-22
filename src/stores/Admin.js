import { makeAutoObservable } from "mobx";
export default class Admin {
  email;
  password;
  error = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setError(error) {
    this.error = error;
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

}