import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TopRecipesComponent} from "./home/top-recipes/top-recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CoursesComponent} from "./courses/courses.component";
import {CuisineComponent} from "./cuisine/cuisine.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./_helpers/auth.guard";

const routes: Routes = [
  {path: '', component: TopRecipesComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'recipes/:filter/:name', component: RecipesComponent},
  {path: 'new-recipe', component: NewRecipeComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'cuisine', component: CuisineComponent},
  {path: 'registration', component: RegistrationComponent},
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
