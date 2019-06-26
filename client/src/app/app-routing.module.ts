import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopRecipesComponent} from "./home/top-recipes/top-recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CoursesComponent} from "./courses/courses.component";
import {CuisineComponent} from "./cuisine/cuisine.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RegistrationComponent} from "./registration/registration.component";

const routes: Routes = [
  {path: '', component: TopRecipesComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'new-recipe', component: NewRecipeComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'cuisine', component: CuisineComponent},
  {path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
