import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public submitted = false;

  public isLogin;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authentication: AuthenticationService,) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
   this.isLogin = this.authentication.isLoggedIn()
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authentication.login(this.loginForm.value)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/']);
          this.ngOnInit()
        }
      });
  }

}
