import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {AuthenticationService} from "../../auth/authentication.service";
import {first} from "rxjs/operators";
import {User} from "@app/models/user";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {


  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  currentUser: User;

  constructor(private recipeService: RecipeService,
              private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router,
              private cookieService: CookieService,
              private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit() {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.toastr.success('Successfully logged in!');
        },
        error => {
          this.error = error.error.message;
          this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
          this.loading = false;
        });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    this.loginForm.value.name = '';
    this.loginForm.value.password = '';
  }

}
