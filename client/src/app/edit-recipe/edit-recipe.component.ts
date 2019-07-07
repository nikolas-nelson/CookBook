import {Component, OnInit} from '@angular/core';
import {RecipeService} from "@app/recipe.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {AddAllergenModalComponent} from "@app/new-recipe/allergens/add-allergen-modal/add-allergen-modal.component";
import {DeleteModalComponent} from "@app/new-recipe/delete-modal/delete-modal.component";
import {CategoryModalComponent} from "@app/new-recipe/categories/category-modal/category-modal.component";
import {CoursesModalComponent} from "@app/new-recipe/courses/courses-modal/courses-modal.component";
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "@app/models/recipe";

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

  public isImage: boolean = false;

  public loading = true;
  public loadingCategory = true;
  public loadingCourse = true;
  public loadingAllergens = true;

  public allergensList: any = [];
  public categories: any;
  public courses: any;

  public submitted = false;

  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private toastr: ToastrService) {
    this.recipeForm = this.fb.group({
      'id': [null],
      'user_id': [1],
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipe(params.get('id')).subscribe((res: Recipe) => {
        this.recipe = res;
        console.log(this.recipe);
        this.recipeForm = this.fb.group({
          'id': [this.recipe.id],
          'user_id': [this.recipe.user.id],
          'name': [this.recipe.name, Validators.required],
          'image_path': [this.recipe.image_path],
          'description': [this.recipe.description, Validators.required],
          'source': [this.recipe.source],
          'prep_time': [this.recipe.prep_time, Validators.required],
          'cook_time': [this.recipe.cook_time, Validators.required],
          'total_time': [this.recipe.prep_time + this.recipe.cook_time],
          'level': [this.recipe.level, Validators.required],
          'cuisine_id': [this.recipe.cuisine_id, Validators.required],
          ingredients: this.fb.array([]),
          steps: this.fb.array([], Validators.required),
          allergens: this.fb.array([]),
          category: this.fb.array([]),
          courses: this.fb.array([])
        });
        this.recipe.ingredients.forEach((x) => {
          this.ingredientArr.push(this.fb.group(x))
        });
        this.recipe.steps.forEach((x) => {
          this.stepsArr.push(this.fb.group(x))
        });
        this.loading = false;
      })
    });

    this.recipeService.getCuisines().subscribe(cuisine => {
      this.cuisine = cuisine;
      this.loadingCuisine = false;
    });

    this.recipeService.getAllergens().subscribe(allergens => {
      this.allergensList = allergens;
      this.loadingAllergens = false;
      this.allergensList.allergens.forEach((x) => {
        this.allergensArr.push(this.fb.group({
          id: x.id,
          selected: (this.recipe.allergens.find(y => y.id === x.id)) ? true : false,
          name: x.name,
        }))
      });
    });

    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loadingCategory = false;
    });

    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loadingCourse = false;
    });
  }


  get allergensArr() {
    return this.recipeForm.get('allergens') as FormArray;
  }

  // getting recipe array to push values from service
  get ingredientArr() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get stepsArr() {
    return this.recipeForm.get('steps') as FormArray;
  }

  onSubmit() {
    const mine: any[] = <any[]>this.recipeForm.value.allergens.filter(x => x.selected),
      selectedAllergens: any[] = mine.map(x => this.allergensList.allergens.find(y => y.id === x.id));
    this.recipeForm.value.allergens = selectedAllergens;
    if (this.selectedImage) {
      this.isImage = true;
      this.recipeForm.value.image_path = this.selectedImage.name;
      this.recipeService.uploadImage(this.selectedImage).subscribe(res => {
        this.toastr.success('Image added successfully')
      })
    } else {
      this.isImage = false;
    }

    this.recipeForm.value.total_time = this.recipeForm.value.prep_time + this.recipeForm.value.cook_time;

    this.submitted = true;
    if (this.recipeForm.valid && this.recipeForm.value.category.length > 0 && this.recipeForm.value.courses.length > 0) {
      this.recipeService.editRecipe(this.recipeForm.value).subscribe(res => {
        this.toastr.success('Recipe edited successfully')
      });
    }
  }


  onFileUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.isImage = true;
      this.selectedImage = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedImage);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.recipeForm.controls;
  }

  //on check adding allergens to the form array
  onChangeAllergen(allergen: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.allergens.push(
        {'id': allergen.id, 'name': allergen.name});
    } else {
      let index = this.recipeForm.value.allergens.indexOf(allergen);
      this.recipeForm.value.allergens.splice(index, 1);
    }

  }

  //on check adding course to the form array
  onChangeCourse(course: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.courses.push(
        {'id': course.id, 'name': course.name});
    } else {
      let index = this.recipeForm.value.courses.indexOf(course);
      this.recipeForm.value.courses.splice(index, 1);
    }

  }

  //on check adding category to the form array
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

  addIngredientFG() {
    return this.fb.group({
      'id': [null],
      'amount': [null, Validators.required],
      'measurement': ['', Validators.required],
      'ingredient': ['', Validators.required],
    });
  }

  addStepFG() {
    return this.fb.group({
      'id': [null],
      'step_number': [1,],
      'instructions': ['', Validators.required]
    });
  }

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
