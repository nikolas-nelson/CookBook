import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-top-recipes',
  templateUrl: './top-recipes.component.html',
  styleUrls: ['./top-recipes.component.scss'],
})
export class TopRecipesComponent implements OnInit {

  public recipes: any;
  public topRecipes: any;
  public loading = true;
  public topRecipesLoading = true;


  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res;
      this.loading = false;
    });
    this.recipeService.getTopRecipes().subscribe(res => {
      this.topRecipes = res;
      this.topRecipesLoading = false;
    });
  }


}
