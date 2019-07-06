import { Component, OnInit } from '@angular/core';
import {RecipeService} from "@app/recipe.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes-by-category',
  templateUrl: './recipes-by-category.component.html',
  styleUrls: ['./recipes-by-category.component.scss']
})
export class RecipesByCategoryComponent implements OnInit {

  public recipes: any;
  public recipe: any;
  public loading = true;
  p: number = 1;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('name') === 'cuisine') {
        let name = params.get('filter');
        this.recipeService.getRecipesCuisine({"filter": name}).subscribe(res => {
          this.recipes = res;
          this.loading = false;
        });
      } else if (params.get('name') === 'category') {
        let name = params.get('filter');
        this.recipeService.getRecipesCategory({"filter": name}).subscribe(res => {
          this.recipes = res;
          this.loading = false;
        });
      } else if (params.get('name') === 'courses') {
        let name = params.get('filter');
        this.recipeService.getRecipesCourses({"filter": name}).subscribe(res => {
          this.recipes = res;
          this.loading = false;
        });
      } else {
        this.recipeService.getRecipes().subscribe(res => {
          this.recipes = res;
          this.loading = false;
        });
      }
    });
  }

}
