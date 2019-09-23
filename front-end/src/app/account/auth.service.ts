import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { UserState } from "../model/user_state";

export interface AuthResponseData {
  email: string;

  registered?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userStateInfo;

  //  private token: string = "";
  private responseMessage;

  private userState$ = new Subject<UserState>();

  baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(private http: HttpClient, private router: Router) {}

  // getToken() {
  //   return this.token;
  // }

  // getUserId() {
  //   return this.userId;
  // }

  getUserState() {
    return this.userState$.asObservable();
  }

  signIn(user) {
    console.log("User info:", user);

    this.http
      .post<{ message: string; token: string }>(this.baseUrl + "/signin", user)
      .subscribe(response => {
        console.log("login response:", response);

        if (!response) {
          this.responseMessage = "";
        }

        const newUserStateInfo = {
          userId: user.email,
          token: response.token,
          message: response.message
        };

        this.responseMessage = response.message;

        this.userState$.next(newUserStateInfo);

        //console.log("logged in user", this.getUserId());
      });

    //return this.responseMessage;
  }

  signUp(user) {
    this.http.post(this.baseUrl + "/signup", user).subscribe(response => {
      console.log(response);
      this.responseMessage = response;
    });
    return this.responseMessage;
  }

  logOut() {
    this.userState$.next(null);
    this.router.navigate(["/home"]);
  }
}
