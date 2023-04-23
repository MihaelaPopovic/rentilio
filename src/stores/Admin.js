import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../firebase";
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
  getIsLoggedIn() {
    if(localStorage.getItem("admin")) {
      return true;
    } 
    return false;
  }
  setLoggedIn(user) {
    localStorage.setItem("admin",user._tokenResponse.refreshToken);
  }
  signIn = async (history) => {
    try {
      this.setIsLoading(true);

      const user = await signInWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      if (user) {
        this.setLoggedIn(user);
        history.push("/dashboard");
      }
      this.setIsLoading(false);
    } catch (error) {
      this.setError(error.message);
      this.setIsLoading(false);
    }
  };
}
