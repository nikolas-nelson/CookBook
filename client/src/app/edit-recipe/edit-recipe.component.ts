import {Component, OnInit} from '@angular/core';
import {RecipeService} from '@app/recipe.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AddAllergenModalComponent} from '@app/new-recipe/allergens/add-allergen-modal/add-allergen-modal.component';
import {DeleteModalComponent} from '@app/new-recipe/delete-modal/delete-modal.component';
import {CategoryModalComponent} from '@app/new-recipe/categories/category-modal/category-modal.component';
import {CoursesModalComponent} from '@app/new-recipe/courses/courses-modal/courses-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '@app/models/recipe';
import {AuthenticationService} from '@app/auth/authentication.service';
import {User} from '@app/models/user';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {

  public recipe: Recipe;
  public cuisine: any;

  public loadingCuisine = true;

  selectedImage: File = null;

  public imageSrc: any;

  public isImage = false;

  public loading = true;
  public loadingCategory = true;
  public loadingCourse = true;
  public loadingAllergens = true;

  public allergensList: any = [];
  public categories: any;
  public courses: any;

  public submitted = false;

  recipeForm: FormGroup;

  currentUser: User;

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private modalService: NgbModal,
              private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.recipeForm = this.fb.group({
      id: [null],
      user_id: [this.currentUser.id],
      name: ['', Validators.required],
      image_path: [''],
      description: ['', Validators.required],
      source: [''],
      prep_time: [null, Validators.required],
      cook_time: [null, Validators.required],
      total_time: [null],
      level: ['', Validators.required],
      cuisine_id: ['', Validators.required],
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipe(params.get('id')).subscribe((res: Recipe) => {
        this.recipe = res;
        this.recipeForm = this.fb.group({
          id: [this.recipe.id],
          user_id: [this.recipe.user.id],
          name: [this.recipe.name, Validators.required],
          image_path: [this.recipe.image_path],
          description: [this.recipe.description, Validators.required],
          source: [this.recipe.source],
          prep_time: [this.recipe.prep_time, Validators.required],
          cook_time: [this.recipe.cook_time, Validators.required],
          total_time: [this.recipe.prep_time + this.recipe.cook_time],
          level: [this.recipe.level, Validators.required],
          cuisine_id: [this.recipe.cuisine_id, Validators.required],
          ingredients: this.fb.array([]),
          steps: this.fb.array([], Validators.required),
          allergens: this.fb.array([]),
          category: this.fb.array([]),
          courses: this.fb.array([])
        });

        this.recipe.ingredients.forEach((x) => {
          this.ingredientArr.push(this.fb.group(x));
        });
        this.recipe.steps.forEach((x) => {
          this.stepsArr.push(this.fb.group(x));
        });
        this.loading = false;
      });
    });

    this.recipeService.getCuisines().subscribe(cuisine => {
      this.cuisine = cuisine;
      this.loadingCuisine = false;
    });

    this.recipeService.getAllergens().subscribe(allergens => {
      this.allergensList = allergens;
      this.allergensList.allergens.forEach((x) => {
        setTimeout(() => {
          this.allergensArr.push(this.fb.group({
            id: x.id,
            selectedAllergen: (this.recipe.allergens.find(y => y.id === x.id)) ? true : false,
            name: x.name,
          }));
        }, 500);
        this.loadingAllergens = false;
      });
    });

    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categories.categories.forEach((x) => {
        setTimeout(() => {
          this.categoriesArr.push(this.fb.group({
            id: x.id,
            selectedCategory: (this.recipe.categories.find(y => y.id === x.id)) ? true : false,
            name: x.name,
          }));
        }, 500);
        this.loadingCategory = false;
      });
    });

    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.courses.courses.forEach((x) => {
        setTimeout(() => {
          this.coursesArr.push(this.fb.group({
            id: x.id,
            selectedCourse: (this.recipe.courses.find(y => y.id === x.id)) ? true : false,
            name: x.name,
          }));
        }, 1000);
        this.loadingCourse = false;
      });
    });
  }

  // getting form arrays to push values from service
  get allergensArr() {
    return this.recipeForm.get('allergens') as FormArray;
  }

  get categoriesArr() {
    return this.recipeForm.get('category') as FormArray;
  }

  get coursesArr() {
    return this.recipeForm.get('courses') as FormArray;
  }

  get ingredientArr() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get stepsArr() {
    return this.recipeForm.get('steps') as FormArray;
  }

  onSubmit() {
    // add allergens to recipe object before it is send to backend
    const allergen: any[] = <any[]> this.recipeForm.value.allergens.filter(x => x.selectedAllergen),
      selectedAllergens: any[] = allergen.map(x => this.allergensList.allergens.find(y => y.id === x.id));
    this.recipeForm.value.allergens = selectedAllergens;

    // add categories to recipe object before it is send to backend
    const category: any[] = <any[]> this.recipeForm.value.category.filter(x => x.selectedCategory),
      selectedCategories: any[] = category.map(x => this.categories.categories.find(y => y.id === x.id));
    this.recipeForm.value.category = selectedCategories;

    // add courses to recipe object before it is send to backend
    const course: any[] = <any[]> this.recipeForm.value.courses.filter(x => x.selectedCourse),
      selectedCourses: any[] = course.map(x => this.courses.courses.find(y => y.id === x.id));
    this.recipeForm.value.courses = selectedCourses;

    if (this.selectedImage) {
      this.isImage = true;
      this.recipeForm.value.image_path = this.selectedImage.name;
      this.recipeService.uploadImage(this.selectedImage).subscribe(res => {
        this.toastr.success('Image added successfully');
      });
    } else {
      this.isImage = false;
    }

    // calculate total cook time and add to recipe object
    this.recipeForm.value.total_time = this.recipeForm.value.prep_time + this.recipeForm.value.cook_time;

    this.submitted = true;
    if (this.recipeForm.valid && this.recipeForm.value.category.length > 0 && this.recipeForm.value.courses.length > 0) {
      this.recipeService.editRecipe(this.recipeForm.value).subscribe(res => {
        this.toastr.success('Recipe edited successfully');
        this.router.navigate(['/recipe/' + this.recipe.id]);
      });
    }
  }

  // upload a recipe image
  onFileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.isImage = true;
      this.selectedImage = <File> event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedImage);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.recipeForm.controls;
  }

  // on check adding allergens to the form array
  onChangeAllergen(allergen: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.allergens.push(
        {id: allergen.id, name: allergen.name});
    } else {
      const index = this.recipeForm.value.allergens.indexOf(allergen);
      this.recipeForm.value.allergens.splice(index, 1);
    }

  }

  // on check adding course to the form array
  onChangeCourse(course: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.courses.push(
        {id: course.id, name: course.name});
    } else {
      const index = this.recipeForm.value.courses.indexOf(course);
      this.recipeForm.value.courses.splice(index, 1);
    }
  }

  // on check adding category to the form array
  onChangeCategory(category: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.category.push(
        {id: category.id, name: category.name, description: category.description});
    } else if (!isChecked) {
      this.recipeForm.value.category.push();
    } else {
      const index = this.recipeForm.value.category.indexOf(category);
      this.recipeForm.value.category.splice(index, 1);
    }
  }

  // adding form group to form array
  addIngredientFG() {
    return this.fb.group({
      id: [null],
      amount: [null, Validators.required],
      measurement: ['', Validators.required],
      ingredient: ['', Validators.required],
    });
  }

  // adding form group to form array
  addStepFG() {
    return this.fb.group({
      id: [null],
      step_number: [1],
      instructions: ['', Validators.required]
    });
  }

  // adding or removing form fields in form group

  addIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(this.addIngredientFG());
  }

  removeIngredient(index: number) {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

  addStep() {
    (<FormArray> this.recipeForm.get('steps')).push(this.addStepFG());
  }

  removeStep(index: number) {
    (<FormArray> this.recipeForm.get('steps')).removeAt(index);
  }

// open bootstrap modal and pass data to the modal
  openAddAllergen() {
    const modalRef = this.modalService.open(AddAllergenModalComponent, {
      size: 'sm'
    });
    modalRef.result.then((result) => {
      if (result) {
        this.loadingAllergens = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openDeleteAllergen(allergen) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: 'sm'
    });
    modalRef.componentInstance.data = {data: allergen, type: 'allergen'};
    modalRef.result.then((result) => {
      if (result) {
        this.loadingAllergens = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openEditAllergen(allergen) {
    const modalRef = this.modalService.open(AddAllergenModalComponent, {
      size: 'sm'
    });
    modalRef.componentInstance.allergen = allergen;
    modalRef.result.then((result) => {
      if (result) {
        this.loadingAllergens = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openAddCategory() {
    const modalRef = this.modalService.open(CategoryModalComponent, {
      size: 'sm'
    });
    modalRef.result.then((result) => {
      if (result) {
        this.loadingCategory = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openDeleteCategory(category) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: 'sm'
    });
    modalRef.componentInstance.data = {data: category, type: 'category'};
    modalRef.result.then((result) => {
      if (result) {
        this.loadingCategory = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openEditCategory(category) {
    const modalRef = this.modalService.open(CategoryModalComponent, {
      size: 'sm'
    });
    modalRef.componentInstance.category = category;
    modalRef.result.then((result) => {
      if (result) {
        this.loadingCategory = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openAddCourse() {
    const modalRef = this.modalService.open(CoursesModalComponent, {
      size: 'sm'
    });
    modalRef.result.then((result) => {
      if (result) {
        this.loadingCourse = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

// open bootstrap modal and pass data to the modal
  openDeleteCourses(course) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: 'sm'
    });
    modalRef.componentInstance.data = {data: course, type: 'course'};
    modalRef.result.then((result) => {
      if (result) {
        this.loadingCourse = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }

  // open bootstrap modal and pass data to the modal
  openEditCourse(course) {
    const modalRef = this.modalService.open(CoursesModalComponent, {
      size: 'sm'
    });
    modalRef.componentInstance.course = course;
    modalRef.result.then((result) => {
      if (result) {
        this.loadingCourse = true;
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit();
      }
    }).catch((res) => {
    });
  }


}
