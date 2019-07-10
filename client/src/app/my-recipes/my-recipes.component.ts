import {Component, OnInit} from '@angular/core';
import {RecipeService} from '@app/recipe.service';
import {User} from '@app/models/user';
import {AuthenticationService} from '@app/auth/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {Recipe} from '@app/models/recipe';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss']
})
export class MyRecipesComponent implements OnInit {

  public recipes: Recipe;
  public currentUser: User;
  public loading = true;
  filters = {
    filter: {user_id: null, }
  };

  p = 1;

  constructor(private recipeService: RecipeService,
              private authenticationService: AuthenticationService,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser) {
      this.filters.filter.user_id = this.currentUser.id;
      this.recipeService.getRecipesByFilter(this.filters).subscribe((res: Recipe) => {
        this.recipes = res;
        this.loading = false;
      });
    }
  }

  deleteRecipe(recipeId) {
    this.recipeService.deleteRecipe(recipeId).subscribe(res => {
      this.toastr.success('Recipe was removed');
      this.ngOnInit();
    }, (error) => {
      this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
    });
  }

}
