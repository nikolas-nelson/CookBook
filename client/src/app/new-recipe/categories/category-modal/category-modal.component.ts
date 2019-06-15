import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../recipe.service";
import {ToastrService} from "ngx-toastr";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {


  @Input() category: Category;

  categoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private toastr: ToastrService) { }

  ngOnInit() {
    if (this.category) {
      this.categoryForm = this.fb.group({
        'id': [this.category.id],
        'name': [this.category.name, Validators.required],
        'description': [this.category.description, Validators.required]
      });
    } else
      this.categoryForm = this.fb.group({
        'id': [null],
        'name': ['', Validators.required],
        'description': ['', Validators.required]
      });
  }

   onSubmit() {
    if (this.category) {
      this.recipeService.editCategory(this.categoryForm.value).subscribe(res => {
        this.activeModal.close(res)
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    } else {
      this.recipeService.addCategory(this.categoryForm.value).subscribe(res => {
        this.activeModal.close(res)
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    }
  }

}
