import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewRecipeComponent} from "./new-recipe.component";
import {AddAllergenModalComponent} from "./allergens/add-allergen-modal/add-allergen-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";
import { CategoryModalComponent } from './categories/category-modal/category-modal.component';
import { CoursesModalComponent } from './courses/courses-modal/courses-modal.component';

@NgModule({
  declarations: [
    NewRecipeComponent,
    AddAllergenModalComponent,
    DeleteModalComponent,
    CategoryModalComponent,
    CoursesModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], entryComponents: [
    CategoryModalComponent,
    CoursesModalComponent
  ]
})
export class NewRecipeModule {
}
