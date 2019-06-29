import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {


  loginForm: FormGroup;
  public submitted = false;

  private token: any;
  public isLogin: boolean = false;

  constructor(private recipeService: RecipeService,
              private authentication: AuthenticationService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router,
              private cookieService: CookieService,
              private toastr: ToastrService) {

    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit() {
    this.token = this.cookieService.get('refreshToken');
    console.log(this.token);
    if(this.token) {
      this.isLogin = true;
    }
  }

   // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if(this.loginForm.valid) {
      this.authentication.login(this.loginForm.value).subscribe(res => {
        this.token = res;
        this.recipeService.updateLoginToken(res);
        this.cookieService.set('refreshToken', this.token.refresh_token);
        if(this.token) {
          this.isLogin = true;
        }
      })
    }
  }

  logout(){

    this.isLogin = false;
  }


}
