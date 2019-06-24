import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-top-recipes',
  templateUrl: './top-recipes.component.html',
  styleUrls: ['./top-recipes.component.scss']
})
export class TopRecipesComponent implements OnInit {

  public recipes: any;
  public loading = true;


  recipeForm: FormGroup;

  ctrl = new FormControl(null, Validators.required);


  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res;
      this.loading = false;
    })
  }



  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

}
