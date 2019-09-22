import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string = null;
  isLoading: boolean = false;

  //card types
  cardTypes: string[] = ["PayPal", "Visa", "Master"];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
        ]
      ],
      password: ["", Validators.required],
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      // profilePic: ["", [Validators.required, requiredFileType('png')]],
      // profilePic: ["", [Validators.required]],
      // cardType: ["", Validators.required]
      cardNumber: ["", Validators.nullValidator],
      secNumber: ["", Validators.nullValidator],
      expiryDate: ["", Validators.nullValidator],
      nameOnCard: ["", Validators.nullValidator]
    });
    console.log("Sign up page loaded");
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading = true;
    const user = {
      fname: this.signupForm.value.fname,
      lname: this.signupForm.value.lname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      profile_picture: this.signupForm.value.profilePic,
      payment_method: {
        // card_type: this.signupForm.value.cardType,
        number: this.signupForm.value.cardNumber,
        secrete_no: this.signupForm.value.secNumber,
        expiry_date: this.signupForm.value.expiryDate,
        name_on_the_card: this.signupForm.value.nameOnCard
      }
    };

    this.isLoading = true;
    const response = this.authService.signUp(user);

    if (response) {
      this.isLoading = false;
      console.log(response);
    } else {
      this.error = response;
      this.isLoading = false;
    }
  }
}
