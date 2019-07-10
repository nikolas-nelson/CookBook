import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.scss']
})
export class CuisineComponent implements OnInit {

  public cuisine: any;
  public loading = true;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipeService.getCuisines().subscribe(cuisine => {
      this.cuisine = cuisine;
      this.loading = false;
    });
  }
}
