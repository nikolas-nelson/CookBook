import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormGroup, Validators,} from "@angular/forms";
import {AddAllergenModalComponent} from "./allergens/add-allergen-modal/add-allergen-modal.component";
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";
import {CategoryModalComponent} from "./categories/category-modal/category-modal.component";
import {CoursesModalComponent} from "./courses/courses-modal/courses-modal.component";
import {AuthenticationService} from "@app/auth/authentication.service";
import {User} from "@app/models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  public cuisine: any;

  public loadingCuisine = true;

  selectedImage: File = null;

  public imageSrc: any;

  public isImage: boolean = false;

  public loading = true;
  public loadingCategory = true;
  public loadingCourse = true;
  public loadingAllergens = true;

  public allergensList: any = [];
  public categories: any;
  public courses: any;

  public submitted = false;

  currentUser: User;

  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private modalService: NgbModal,
              private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

    this.recipeService.getCuisines().subscribe(cuisine => {
      this.cuisine = cuisine;
      this.loadingCuisine = false;
    });

    this.recipeService.getAllergens().subscribe(allergens => {
      this.allergensList = allergens;
      this.loadingAllergens = false;
    });

    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadingCategory = false;
    });

    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loadingCourse = false;
    });

    this.recipeForm = this.fb.group({
      'id': [null],
      'user_id': [this.currentUser.id],
      'name': ['', Validators.required],
      'image_path': ['',],
      'description': ['', Validators.required],
      'source': [''],
      'prep_time': [null, Validators.required],
      'cook_time': [null, Validators.required],
      'total_time': [null],
      'level': ['', Validators.required],
      'cuisine_id': ['', Validators.required],
      ingredients: this.fb.array([
        this.addIngredientFG()
      ]),
      steps: this.fb.array([
        this.addStepFG()
      ], Validators.required),
      allergens: this.fb.array([]),
      category: this.fb.array([]),
      courses: this.fb.array([])
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.recipeForm.controls;
  }

    //on check adding category to the form array
  onChangeAllergen(allergen: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.allergens.push(
        {'id': allergen.id, 'name': allergen.name});
    } else {
      let index = this.recipeForm.value.allergens.indexOf(allergen);
      this.recipeForm.value.allergens.splice(index, 1);
    }

  }

    //on check adding category to the form array
  onChangeCourse(course: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.courses.push(
        {'id': course.id, 'name': course.name});
    } else {
      let index = this.recipeForm.value.courses.indexOf(course);
      this.recipeForm.value.courses.splice(index, 1);
    }

  }

  onChangeCategory(category: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.category.push(
        {'id': category.id, 'name': category.name, 'description': category.description});
    } else if (!isChecked) {
      this.recipeForm.value.category.push();
    } else {
      let index = this.recipeForm.value.category.indexOf(category);
      this.recipeForm.value.category.splice(index, 1);
    }

  }

  //adding form group to form array
  addIngredientFG() {
    return this.fb.group({
      'id': [null],
      'amount': [null, Validators.required],
      'measurement': ['', Validators.required],
      'ingredient': ['', Validators.required],
    });
  }

  //adding form group to form array
  addStepFG() {
    return this.fb.group({
      'id': [null],
      'step_number': [1,],
      'instructions': ['', Validators.required]
    });
  }

  //adding or removing form fields in form group
  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.addIngredientFG())
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  addStep() {
    (<FormArray>this.recipeForm.get('steps')).push(this.addStepFG())
  }

  removeStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index)
  }


  // image upload
  onFileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.isImage = true;
      this.selectedImage = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit() {
    if (this.selectedImage) {
      this.isImage = true;
      this.recipeForm.value.image_path = this.selectedImage.name;
      this.recipeService.uploadImage(this.selectedImage).subscribe(res => {
      })
    } else {
      this.isImage = false;
    }

     // calculate total cook time and add to recipe object
    this.recipeForm.value.total_time = this.recipeForm.value.prep_time + this.recipeForm.value.cook_time;

    this.submitted = true;
    if (this.recipeForm.valid && this.recipeForm.value.category.length > 0 && this.recipeForm.value.courses.length > 0) {
      this.recipeService.addRecipe(this.recipeForm.value).subscribe(res => {
        this.toastr.success('Your recipe was added!');
        this.router.navigate(['/my-recipes']);
      });
    }
  }

  // open bootstrap modal and pass data to the modal
  openAddAllergen() {
    const modalRef = this.modalService.open(AddAllergenModalComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openDeleteAllergen(allergen) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.data = {data: allergen, type: 'allergen'};
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openEditAllergen(allergen) {
    const modalRef = this.modalService.open(AddAllergenModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.allergen = allergen;
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openAddCategory() {
    const modalRef = this.modalService.open(CategoryModalComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openDeleteCategory(category) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.data = {data: category, type: 'category'};
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openEditCategory(category) {
    const modalRef = this.modalService.open(CategoryModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.category = category;
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openAddCourse() {
    const modalRef = this.modalService.open(CoursesModalComponent, {
      size: "sm"
    });
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openDeleteCourses(course) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.data = {data: course, type: 'course'};
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openEditCourse(course) {
    const modalRef = this.modalService.open(CoursesModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.course = course;
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {
    });
  }

}
