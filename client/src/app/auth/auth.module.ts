import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from "./authentication.service";
import {JwtInterceptor} from "./jwt.interceptor";
import {RecipeGuard} from "./guards/recipe.guard";
import {AuthGuard} from "./guards/auth.guard";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
     AuthGuard,
    AuthenticationService,
    RecipeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class AuthModule { }
