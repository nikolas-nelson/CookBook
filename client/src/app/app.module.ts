import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeroComponent} from './home/hero/hero.component';
import {TopRecipesComponent} from './home/top-recipes/top-recipes.component';
import {FooterComponent} from './footer/footer.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {HttpClientModule} from "@angular/common/http";
import { CategoriesComponent } from './categories/categories.component';
import { CuisineComponent } from './cuisine/cuisine.component';
import { CoursesComponent } from './courses/courses.component';
import { AddAllergenModalComponent } from './new-recipe/allergens/add-allergen-modal/add-allergen-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { DeleteModalComponent } from './new-recipe/delete-modal/delete-modal.component';
import {NewRecipeModule} from "./new-recipe/new-recipe.module";
import { RecipesComponent } from './recipes/recipes.component';
import {NgxPaginationModule} from "ngx-pagination";
import {AppBootstrapModule} from "./app-bootstrap/app-bootstrap.module";
import {OrderModule} from "ngx-order-pipe";
import {CookieService} from "ngx-cookie-service";
import { RegistrationComponent } from './registration/registration.component';
import {AuthenticationService} from "./auth/authentication.service";
import {AuthGuard} from "./_helpers/auth.guard";
import {LoginComponent} from "@app/auth/login/login.component";
import { TruncatePipe } from './_helpers/truncate.pipe';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipesByCategoryComponent } from './recipes-by-category/recipes-by-category.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeroComponent,
    TopRecipesComponent,
    FooterComponent,
    RecipeDetailComponent,
    CategoriesComponent,
    CuisineComponent,
    CoursesComponent,
    RecipesComponent,
    RegistrationComponent,
    LoginComponent,
    TruncatePipe,
    MyRecipesComponent,
    RecipesByCategoryComponent,
    EditRecipeComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NewRecipeModule,
    NgxPaginationModule,
    AppBootstrapModule,
    FormsModule,
    OrderModule,
  ],
  providers: [
    CookieService,
    AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddAllergenModalComponent,
    DeleteModalComponent
  ]
})
export class AppModule {
}
