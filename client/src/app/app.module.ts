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
    CoursesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CommentModalComponent
  ]
})
export class AppModule {
}
