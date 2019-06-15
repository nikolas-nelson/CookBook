import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllergensComponent} from "./allergens/allergens.component";
import {NewRecipeComponent} from "./new-recipe.component";
import {AddAllergenModalComponent} from "./allergens/add-allergen-modal/add-allergen-modal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { StepsComponent } from './steps/steps.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CategoryModalComponent } from './categories/category-modal/category-modal.component';
import { CoursesModalComponent } from './courses/courses-modal/courses-modal.component';

@NgModule({
  declarations: [
    NewRecipeComponent,
    AllergensComponent,
    AddAllergenModalComponent,
    DeleteModalComponent,
    CategoriesComponent,
    CoursesComponent,
    StepsComponent,
    IngredientsComponent,
    CategoryModalComponent,
    CoursesModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], entryComponents: [
    CategoryModalComponent,
    CoursesModalComponent
  ]
})
export class NewRecipeModule {
}
