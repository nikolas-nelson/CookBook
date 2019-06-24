import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from 'ngx-cookie-service';

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
  public cookieValue = '';

  rating = {};

  ctrl = new FormControl(null, Validators.required);

  commentForm: FormGroup;
  public submitted = false;
  public isComment: boolean = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipe(params.get('id')).subscribe(res => {
        this.recipe = res;
        this.loading = false;

        this.commentForm = this.fb.group({
          'comment': ['', Validators.required],
          'name': ['', Validators.required],
          'email': ['', Validators.required],
          'recipes_id': [this.recipe.id]
        })
      })
    });
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.recipeService.getCuisines().subscribe(cuisines => {
      this.cuisines = cuisines;
    });
    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses
    });
    this.cookieValue = this.cookieService.get('isVoted');
    if (this.cookieValue === 'Yes') {
      this.ctrl.disable();
    }


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commentForm.controls;
  }

  addComment() {
    this.isComment = !this.isComment
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.submitted = true;
      console.log(this.commentForm);
      this.recipeService.addComment(this.commentForm.value).subscribe(res => {
        console.log(res);
        this.isComment = false;
        this.submitted = false;
        this.ngOnInit()
      }, (error) => {
        console.log(error)
      })
    } else {
      this.submitted = true;
    }

  }

  saveRating() {
    this.rating = {
      "id": null,
      "recipes_id": this.recipe.id,
      "vote_score": this.ctrl.value
    };
    this.recipeService.addRating(this.rating).subscribe(res => {
      console.log(res);
      this.cookieService.set('isVoted', 'Yes');
    }, (error) => {
      console.log(error)
    })

  }


}
