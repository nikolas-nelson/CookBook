import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {CommentModalComponent} from "./comment-modal/comment-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-recipe-datail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  public recipe: any;
  public categories: any;
  public cuisines: any;
  public courses: any;
  public loading = true;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipe(params.get('id')).subscribe(res => {
        this.recipe = res;
        this.loading = false;
      })
    });
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.recipeService.getCuisines().subscribe(cuisines => {
      this.cuisines = cuisines;
    });
    this.recipeService.getCourses().subscribe( courses => {
      this.courses = courses
    });
  }

  openAddComment() {
    const modalRef = this.modalService.open(CommentModalComponent);
    modalRef.componentInstance.name = 'World';
  }


}
