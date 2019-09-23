import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isLoading: boolean = false;
  error: string = null;
  userStateSubscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ]
      ],
      password: ["", Validators.required]
    });
    console.log("Sign up page loaded");
  }

  ngOnInit() {}

  onSubmit() {
    const account = {
      email: this.signinForm.value.email,
      password: this.signinForm.value.password
    };

    this.isLoading = true;

    this.authService.signIn(account);

    this.userStateSubscription = this.authService
      .getUserState()
      .subscribe(userState => {
        if (userState.token) {
          this.isLoading = false;

          this.router.navigate(["/cart"]);
        } else {
          this.error = "Error: check your user name or password";
          this.isLoading = false;
        }
      });
  }
}
