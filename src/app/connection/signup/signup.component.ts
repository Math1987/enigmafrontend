import { AccountService } from "./../../shared/services/account.service";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
/**
 * SignUp, create new account.
 * check forms with validators, use materials
 * check dynamically if email and name are free, with async validators and customised pipe
 */
export class SignupComponent implements OnInit {
  /**
   * the formGroup angular containing controls as name, email, password and confirm
   */
  public formGroup: FormGroup;

  /**
   * form control is used from connection's component lazy loaded by connection's module
   * @param http: used for validators
   * @param authService: called if form valid and submitted
   * @param router: send the user to player's main route if creation of account succes
   */
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router
  ) {}

  /**
   * init formGroup as data-driven model
   * set name, email, password and confirm inputs
   */
  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(
        "",
        Validators.required,
        this.validateName.bind(this)
      ),
      email: new FormControl(
        "",
        [Validators.required, Validators.email],
        this.validateEmail.bind(this)
      ),
      password: new FormControl("", [
        Validators.required,
        this.matchingPassword.bind(this),
      ]),
      confirm: new FormControl("", [
        Validators.required,
        this.matchingConfirm.bind(this),
      ]),
    });
  }
  /**
   * check in backend if name is usable or not.
   * If not, send the error as "nameExist". the input pipe will transform to the good error message
   * @param formControl: as name input control
   */
  validateName(formControl: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.accountService.checkName(formControl.value).subscribe(
        (res) => {
          if (res) {
            resolve({ nameExist: true });
          } else {
            resolve(null);
          }
        },
        (err) => {
          console.log(err);
          resolve({ backend: true });
        }
      );
    });
  }
  /**
   * This validator call backend to check if the email in the form control is in the database
   * If not, send the error as "emailExist". the input pipe will transform to the good error message
   * @param formControl: as email input control
   */
  validateEmail(formControl: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      this.accountService.checkEmail(formControl.value).subscribe(
        (res) => {
          if (res) {
            resolve({ emailExist: true });
          } else {
            resolve(null);
          }
        },
        (err) => {
          resolve({ backend: true });
        }
      );
    });
  }

  /**
   * check from password input if confirm and password match
   * if match, clear errors in confirm,
   * else send "nomatch" error and pipe will transform to error message
   * @param formControl: as password input
   */
  matchingPassword(formControl: FormControl) {
    if (this.formGroup && this.formGroup.value.confirm !== formControl.value) {
      return { nomatch: true };
    } else {
      if (this.formGroup) {
        this.formGroup.controls.confirm.setErrors(null);
      }
      return null;
    }
  }

  /**
   * check if confirm and password match
   * if match, clear password control errors,
   * elsse send nomatch, pipe will transform to error message
   * @param formControl: as confirm input
   */
  matchingConfirm(formControl: FormControl) {
    if (this.formGroup && this.formGroup.value.password !== formControl.value) {
      return { nomatch: true };
    } else {
      if (
        this.formGroup &&
        this.formGroup.value &&
        this.formGroup.value.password
      ) {
        this.formGroup.controls.password.setErrors(null);
      }
      return null;
    }
  }
  /**
   * ask the authService signUp user with all formGroup's values.
   * if the subscription is correct, navigate to main player's module route.
   */
  create() {
    this.accountService.signUp(this.formGroup.value).subscribe((res) => {
      if (res) {
        localStorage.setItem("confirm", "wait");
        // this.router.navigate(["/connexion/confirmer"]);
        // this.authService.signIn(res).subscribe((signin) => {
        //   this.router.navigate(["confirmer"]);
        // });
      }
    });
  }
}
