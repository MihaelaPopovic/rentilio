import {
  makeAutoObservable
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
  constructor() {
    makeAutoObservable(this);
  }

  setEmail(email) {
    this.email = email;
    const input = document.querySelector(".email");
    input.classList.remove("invalid");
  }

  setPassword(password) {
    this.password = password;
    const input = document.querySelector(".password");
    input.classList.remove("invalid");
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
  
  signIn = async (history) => {
    try {
      this.messageApi.open({
        type: "info",
        content: "Logging in...",
      });
      this.setIsLoading(true);
      const data = {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      };
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB769VRkyrO5hOXklG8Sc0mQUKDYU4YQus",
        data
      );

      if (response.data) {
        this.setLoggedIn(response.data);
        history.push("/dashboard");
      }
      this.messageApi.open({
        type: "success",
        content: "You are logged in!",
      });
      this.setIsLoading(false);
    } catch (error) {
      this.messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
      this.setIsLoading(false);
    }
  };
}