import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  public recipes: any;
  public loading = true;
  p: number = 1;


  public level = '';

  filters = {
    filter: {}
  };

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,) {
  }

  ngOnInit() {

    this.recipeService.getRecipesByFilter(this.filters).subscribe(res => {
      this.recipes = res;
      this.loading = false;
    });

  }

  filterRecipes() {
    if (this.level !== '') {
      this.filters.filter = {'level': this.level};
      this.loading = true;
      this.ngOnInit()
    } else {
      this.filters.filter = {};
      this.loading = true;
      this.ngOnInit()
    }
  }



}
