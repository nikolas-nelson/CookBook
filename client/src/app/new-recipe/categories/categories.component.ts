import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {CategoryModalComponent} from "./category-modal/category-modal.component";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

   public loading = true;
     public categories: any;

  constructor(private recipeService: RecipeService,
              private modalService: NgbModal,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.loading = false;
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
    }).catch((res) => {});
  }

   openDeleteCategory(category) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.data = {data : category, type: 'category'};
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
    }).catch((res) => {});
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
    }).catch((res) => {});
  }

}
