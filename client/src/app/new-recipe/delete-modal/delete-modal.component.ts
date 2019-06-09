import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() allergen;

  constructor(public activeModal: NgbActiveModal,
              private recipeService: RecipeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {

  }

  deleteAllergen(allergenId) {
    this.recipeService.deleteAllergen(allergenId).subscribe(res => {
      this.activeModal.close(res)
    }, (error) => {
      this.toastr.error(error.message, 'Ohh NO! Something went wrong');
    });
  }

}
