import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {AddAllergenModalComponent} from "./add-allergen-modal/add-allergen-modal.component";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-allergens',
  templateUrl: './allergens.component.html',
  styleUrls: ['./allergens.component.scss']
})
export class AllergensComponent implements OnInit {

   public loading = true;
   public allergens: any = {};

  constructor(private recipeService: RecipeService,
              private modalService: NgbModal,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.recipeService.getAllergens().subscribe(allergens =>  {
      this.allergens = allergens;
      this.loading = false;
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
    }).catch((res) => {});
  }

  openDeleteAllergen(allergen) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      size: "sm"
    });
    modalRef.componentInstance.allergen = allergen;
    modalRef.result.then((result) => {
      if (result) {
        this.toastr.success(result.message, 'Success!');
        this.ngOnInit()
      }
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
    });
  }

}
