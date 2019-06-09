import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {RecipeService} from "../../../recipe.service";
import {ToastrService} from "ngx-toastr";
import {Allergen} from "../../../models/allergen";


@Component({
  selector: 'app-add-allergen-modal',
  templateUrl: './add-allergen-modal.component.html',
  styleUrls: ['./add-allergen-modal.component.scss']
})
export class AddAllergenModalComponent implements OnInit {

  allergenForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  @Input() allergen: Allergen;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private toastr: ToastrService) {}


  ngOnInit() {
  if (this.allergen) {
      this.allergenForm = this.fb.group({
        'id': [this.allergen.id],
        'name': [this.allergen.name, Validators.required]
      });
    } else
      this.allergenForm = this.fb.group({
        'id': [null],
        'name': ['', Validators.required]
      });
  }

  onSubmit() {
    if (this.allergen) {
      this.recipeService.editAllergen(this.allergenForm.value).subscribe(res => {
        this.activeModal.close(res)
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    } else {
      this.recipeService.addAllergen(this.allergenForm.value).subscribe(res => {
        this.activeModal.close(res)
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    }
  }

}
