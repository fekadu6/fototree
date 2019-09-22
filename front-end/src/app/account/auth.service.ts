import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface AuthResponseData {
  email: string;

  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  private responseMessage;

  baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  signIn(user) {
    this.http
      .post<{ token: string }>(this.baseUrl + "/signin", user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        this.responseMessage = response;
      });

    return this.responseMessage;
  }

  signUp(user) {
    this.http.post(this.baseUrl + "/signup", user).subscribe(response => {
      console.log(response);
      this.responseMessage = response;
    });
    return this.responseMessage;
  }
}
