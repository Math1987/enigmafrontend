import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  token: string = null;

  constructor() {
    console.log("build token service");
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
    }
  }

  getToken() {
    return this.token;
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }
  removeToken() {
    localStorage.removeItem("token");
  }
}
