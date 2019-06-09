import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {CommentModalComponent} from "../recipe-detail/comment-modal/comment-modal.component";
import {AddAllergenModalComponent} from "./allergens/add-allergen-modal/add-allergen-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  public cuisine: any;

  public loadingCuisine = true;

  constructor(private recipeService: RecipeService,
              private modalService: NgbModal,
              private toastr: ToastrService) {
  }

  ngOnInit() {

    this.recipeService.getCuisines().subscribe(cuisine => {
      this.cuisine = cuisine;
      this.loadingCuisine = false;
    });

  }




}
