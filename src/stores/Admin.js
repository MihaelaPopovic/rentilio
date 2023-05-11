import {
  makeObservable,
  observable,
  action
} from "mobx";
import axios from "axios";
import {
  message
} from "antd";

export default class Admin {
  messageApi = message;
  email;
  password;
  isLoading = false;
  constructor(email, password) {
    this.email = email;
    this.password = password;
    makeObservable(this, {
      email: observable,
      password: observable,
      setEmail: action,
      setPassword: action
    })
  }

  setEmail(email, emailRef) {
    this.email = email;
    if (emailRef.current.classList.contains('invalid')) {
      emailRef.current.classList.remove("invalid");
    }
  }

  setPassword(password, passwordRef) {
    this.password = password;
    if (passwordRef.current.classList.contains('invalid')) {
      passwordRef.current.classList.remove("invalid");
    }
  }

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  removeFromStorage() {
    localStorage.removeItem("admin");
  }

  getToken() {
    if (localStorage.getItem("admin")) {
      return localStorage.getItem("admin");
    }
    return null;
  }

  getIsLoggedIn() {
    if (localStorage.getItem("admin")) {
      return true;
    }
    return false;
  }

  setLoggedIn(user) {
    const body = {
      'idToken': user.idToken
    }
    localStorage.setItem("admin", JSON.stringify(body));
  }
}