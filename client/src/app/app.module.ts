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
import { CommentModalComponent } from './recipe-detail/comment-modal/comment-modal.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { CategoriesComponent } from './categories/categories.component';
import { CuisineComponent } from './cuisine/cuisine.component';
import { CoursesComponent } from './courses/courses.component';
import { AddAllergenModalComponent } from './new-recipe/add-allergen-modal/add-allergen-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { DeleteModalComponent } from './new-recipe/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HeroComponent,
    TopRecipesComponent,
    FooterComponent,
    RecipeDetailComponent,
    CommentModalComponent,
    NewRecipeComponent,
    CategoriesComponent,
    CuisineComponent,
    CoursesComponent,
    AddAllergenModalComponent,
    DeleteModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CommentModalComponent,
    AddAllergenModalComponent,
    DeleteModalComponent
  ]
})
export class AppModule {
}
