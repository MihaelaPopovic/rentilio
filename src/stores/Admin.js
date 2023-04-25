import { makeAutoObservable } from "mobx";
import axios from "axios";
import { message } from "antd";

export default class Admin {
  messageApi = message;
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
  getIsLoggedIn() {
    if (localStorage.getItem("admin")) {
      return true;
    }
    return false;
  }
  setLoggedIn(user) {
    localStorage.setItem("admin", user.refreshToken);
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
/* import axios from "axios";
import { message } from "antd";

export const Admin = () => {
  messageApi = message;
  email;
  password;
  isLoading = false;

  return {
  setEmail (email) {
    this.email = email;
  },
  setPassword(password) {
    this.password = password;
  },

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  },
  getIsLoggedIn() {
    if (localStorage.getItem("admin")) {
      return true;
    }
    return false;
  },
  setLoggedIn(user) {
    localStorage.setItem("admin", user.refreshToken);
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
      messageApi.open({
        type: "success",
        content: "You are logged in!",
      });
      this.setIsLoading(false);
    } catch (error) {
      messageApi.open({
        type: "warning",
        content: "Something went wrong!",
      });
      this.setIsLoading(false);
    }
  }
}
} */
