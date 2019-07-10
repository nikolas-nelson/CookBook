import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories: any;
  public loading = true;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });
  }

}
