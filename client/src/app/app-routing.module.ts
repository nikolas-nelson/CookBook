import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopRecipesComponent} from "./home/top-recipes/top-recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";

const routes: Routes = [
  {path: '', component: TopRecipesComponent},
  {path: 'recipe/:id', component: RecipeDetailComponent},
  {path: 'new-recipe', component: NewRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
