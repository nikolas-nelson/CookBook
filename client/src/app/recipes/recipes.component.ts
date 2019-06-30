import {Component, OnInit,} from '@angular/core';
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  public recipes: any;
  public recipe: any;
  public loading = true;
  p: number = 1;
  public sort = 'name';
  public order = false;

  public searchName;
  public level = '';
  public timeKey = '';
  public timeValue = null;

  filters = {
    filter: {}
  };

  search = {
    filter: {}
  };


  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getRecipesByFilter(this.filters).subscribe(res => {
      this.recipes = res;
      this.loading = false;
    });

  }

  filterRecipes() {
    if (this.level !== '') {
      this.filters.filter['level'] = this.level;
    } else {
      delete this.filters.filter['level'];
    }
    if (this.timeKey !== '' && this.timeValue !== null) {
      this.filters.filter[this.timeKey] = this.timeValue;
    } else {

    }
    this.loading = true;
    this.ngOnInit();
    delete this.filters.filter[this.timeKey];
  }

  searchRecipes() {
    this.search.filter['name'] = this.searchName;
    this.recipeService.getRecipesBySearch(this.search).subscribe(res => {
      this.recipes = res;
      this.loading = false;
    })
  }


}
