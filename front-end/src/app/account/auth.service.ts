import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
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

  private userState$ = new Subject<UserState>();

  baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(private http: HttpClient, private router: Router) {}

  getUserState() {
    return this.userState$.asObservable();
  }

  signIn(user) {
    console.log("User info:", user);

    this.http
      .post<{ message: string; token: string }>(this.baseUrl + "/signin", user)
      .subscribe(response => {
        console.log("login response:", response);
        let newUserStateInfo;
        if (!response) {
          newUserStateInfo = null;
        } else {
          newUserStateInfo = {
            userId: user.email,
            token: response.token,
            message: response.message
          };
        }

        this.userStateInfo = newUserStateInfo;

        this.userState$.next(this.userStateInfo);

        console.log("logged in user", this.userStateInfo);
      });
  }

  signUp(user) {
    this.http.post(this.baseUrl + "/signup", user).subscribe(response => {
      console.log(response);
      this.router.navigate(["/signin"]);
    });
  }

  logOut() {
    this.userStateInfo = null;
    this.userState$.next(this.userStateInfo);
    this.router.navigate(["/home"]);
  }
}
