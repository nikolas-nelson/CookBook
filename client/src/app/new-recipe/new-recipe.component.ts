import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  public allergens: any;
  public categories: any;
  public cuisine: any;
  public courses: any;
  public loadingAllergens = true;
  public loadingCategory = true;
  public loadingCuisine = true;
  public loadingCourses = true;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getAllergens().subscribe(allergens => {
      this.allergens = allergens;
      this.loadingAllergens = false;
    });
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadingCategory = false;
    });
    this.recipeService.getCuisines().subscribe( cuisine => {
      this.cuisine = cuisine;
      this.loadingCuisine = false;
    });
    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loadingCourses = true;
    })
  }

}
