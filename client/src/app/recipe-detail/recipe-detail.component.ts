import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from "@app/auth/authentication.service";
import {User} from "@app/models/user";
import {ToastrService} from "ngx-toastr";

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
  public isVoted: boolean = false;

  rating = {};

  ctrl = new FormControl(null, Validators.required);

  commentForm: FormGroup;
  public submitted = false;
  public isComment: boolean = false;
  public isEdit = false;

  currentUser: User;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService,
              private recipeService: RecipeService,
              private cookieService: CookieService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipe(params.get('id')).subscribe(res => {
        this.recipe = res;
        this.loading = false;
        if (this.currentUser) {
          this.commentForm = this.fb.group({
            'comment': ['', Validators.required],
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'recipes_id': [this.recipe.id],
            'user_id': [this.currentUser.id]
          });
        }
        this.cookieValue = this.cookieService.get('recipeId');
        if (this.cookieValue == String(this.recipe.id)) {
          this.isVoted = true;
          this.ctrl.disable();
        }
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


  }

  // convenience getter for easy access to form fields
  get f() {
    return this.commentForm.controls;
  }

  showEditComment() {
    if (this.currentUser) {
      this.isEdit = false;
      this.isComment = !this.isComment;
      this.commentForm = this.fb.group({
        'comment': ['', Validators.required],
        'name': ['', Validators.required],
        'email': ['', Validators.required],
        'recipes_id': [this.recipe.id],
        'user_id': [this.currentUser.id]
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  editComment(comment) {
    if (this.currentUser) {
      if (this.currentUser.id === comment.user_id) {
        this.isComment = true;
        this.isEdit = true;
        this.commentForm = this.fb.group({
          'id': [comment.id],
          'comment': [comment.comment, Validators.required],
          'name': [comment.name, Validators.required],
          'email': [comment.email, Validators.required],
          'recipes_id': [this.recipe.id],
          'user_id': [this.currentUser.id]
        });
      }
    } else {
      this.router.navigate(['/login']);
    }

  }

  deleteComment(commentId) {
    this.recipeService.deleteComment(commentId).subscribe(() => {
      this.toastr.success('Your comment was successfully deleted!');
      this.ngOnInit()
    }, (error) => {
      this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
    })
  }

  addComment() {
    if (this.commentForm.valid) {
      this.submitted = true;
      this.recipeService.addComment(this.commentForm.value).subscribe(res => {
        this.isComment = false;
        this.submitted = false;
        this.toastr.success('Your comment was successfully added!');
        this.ngOnInit()
      }, (error) => {
        this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
      })
    } else {
      this.submitted = true;
    }

  }

  addEditedComment() {
    if (this.commentForm.valid) {
      this.submitted = true;
      this.recipeService.editComment(this.commentForm.value).subscribe(res => {
        this.isComment = false;
        this.submitted = false;
        this.toastr.success('Your comment was successfully added!');
        this.ngOnInit()
      }, (error) => {
        this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
      })
    } else {
      this.submitted = true;
    }
  }

  // saving rating and adding cookies to not allow rate 2x
  saveRating() {
    this.rating = {
      "id": null,
      "recipes_id": this.recipe.id,
      "vote_score": this.ctrl.value
    };
    this.recipeService.addRating(this.rating).subscribe(res => {
      this.toastr.success('Your rating was successfully added!');
      this.cookieService.set('recipeId', this.recipe.id);
      this.isVoted = true;
    }, (error) => {
      this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
    })

  }


}
