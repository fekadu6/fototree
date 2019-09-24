import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
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
  private initialState = {
    userId: null,
    message: null,
    token: null
  };
  public userStateInfo: UserState = this.initialState;

  public userState$: BehaviorSubject<UserState> = new BehaviorSubject<
    UserState
  >(this.userStateInfo);

  baseUrl: string = "http://localhost:3000/fototree-api";

  constructor(private http: HttpClient, private router: Router) {}

  // getUserState() {
  //   return this.userState$.asObservable();
  // }

  signIn(user) {
    console.log("User info:", user);

    return this.http.post<{ userId: string; message: string; token: string }>(
      this.baseUrl + "/signin",
      user
    );
    // .subscribe(response => {
    //   console.log("login response:", response);
    //   let newUserStateInfo;
    //   if (!response) {
    //     newUserStateInfo = null;
    //   } else {
    //     newUserStateInfo = {
    //       userId: user.email,
    //       token: response.token,
    //       message: response.message
    //     };
    //   }

    //   this.userStateInfo = newUserStateInfo;

    //   this.userState$.next(this.userStateInfo);

    //   console.log("A", this.userStateInfo);
    // });
  }

  getUserState() {
    return this.userState$;
  }

  signUp(user) {
    return this.http.post(this.baseUrl + "/signup", user);
  }

  logOut() {
    this.userStateInfo = this.initialState;
    this.userState$.next(this.userStateInfo);
    this.router.navigate(["/home"]);
  }

  isAuthenticated() {
    return !this.userStateInfo.token;
  }
}
