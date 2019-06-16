import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn} from "@angular/forms";
import {AddAllergenModalComponent} from "./allergens/add-allergen-modal/add-allergen-modal.component";
import {DeleteModalComponent} from "./delete-modal/delete-modal.component";
import {CategoryModalComponent} from "./categories/category-modal/category-modal.component";
import {CoursesModalComponent} from "./courses/courses-modal/courses-modal.component";

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

  public allergensList: any = {};
  public categories: any;
   public courses: any;

  categoriesSelected = [
    false, true, false
  ];

  recipeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    image_path: new FormControl('',),
    description: new FormControl(''),
    source: new FormControl(''),
    prep_time: new FormControl(''),
    cook_time: new FormControl(''),
    level: new FormControl('', Validators.required),
    cuisine_id: new FormControl(''),
  });


  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private toastr: ToastrService) {
  }

  ngOnInit() {

    this.recipeService.getCuisines().subscribe(cuisine => {
      this.cuisine = cuisine;
      this.loadingCuisine = false;
    });

    this.recipeService.getAllergens().subscribe(allergens => {
      this.allergensList = allergens;
      this.loading = false;
    });

    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
    });

     this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loading = false;
    });

    this.recipeForm = this.fb.group({
      'id': [null],
      'user_id': [1],
      'name': ['', Validators.required],
      'image_path': [''],
      'description': ['', Validators.required],
      'source': [''],
      'prep_time': [null, Validators.required],
      'cook_time': [null, Validators.required],
      'level': ['', Validators.required],
      'cuisine_id': ['', Validators.required],
      ingredients: this.fb.array([
        this.addIngredientFG()
      ]),
      steps: this.fb.array([
        this.addStepFG()
      ]),
      allergens: this.fb.array([]),
      category: this.fb.array([]),
      courses: this.fb.array([])
    });

  }

  onChangeAllergen(allergen: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.allergens.push(
        {'id': allergen.id, 'name': allergen.name});
    } else {
      let index = this.recipeForm.value.allergens.indexOf(allergen);
      this.recipeForm.value.allergens.splice(index, 1);
    }

    console.log(this.recipeForm.value)
  }

  onChangeCourse(course: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.courses.push(
        {'id': course.id, 'name': course.name});
    } else {
      let index = this.recipeForm.value.courses.indexOf(course);
      this.recipeForm.value.courses.splice(index, 1);
    }

    console.log(this.recipeForm.value)
  }

  onChangeCategory(category: any, isChecked: boolean) {
    if (isChecked) {
      this.recipeForm.value.category.push(
        {'id': category.id, 'name': category.name, 'description': category.description});
    } else {
      let index = this.recipeForm.value.category.indexOf(category);
      this.recipeForm.value.category.splice(index, 1);
    }

    console.log(this.recipeForm.value)
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

  addStep() {
    (<FormArray>this.recipeForm.get('steps')).push(this.addStepFG())
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

  onSubmit() {
    if (this.selectedImage) {
      this.isImage = true;
      this.recipeForm.value.image_path = this.selectedImage.name;
    } else {
      this.isImage = false;
    }

    this.recipeService.addRecipe(this.recipeForm.value).subscribe(res => {
      console.log(res)
    });
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
    }).catch((res) => {});
  }

   openDeleteCourses(course) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.data = {data : course, type: 'course'};
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {});
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
    }).catch((res) => {});
  }

}
