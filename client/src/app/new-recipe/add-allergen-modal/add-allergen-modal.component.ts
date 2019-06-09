import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {RecipeService} from "../../recipe.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-add-allergen-modal',
  templateUrl: './add-allergen-modal.component.html',
  styleUrls: ['./add-allergen-modal.component.scss']
})
export class AddAllergenModalComponent implements OnInit {

  public saveMessage: any;

  allergenForm = new FormGroup({
    name: new FormControl('')
  });


  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private recipeService : RecipeService,
              private toastr: ToastrService) {
    this.allergenForm = fb.group({
      'id' : [null],
      'name': ['', Validators.required]
    });
  }


  ngOnInit() {

  }

  onSubmit() {
    this.recipeService.addAllergen(this.allergenForm.value).subscribe( res => {
      this.saveMessage = res;
      this.activeModal.close(res)
    }, (error) => {
      console.log(error);
      this.toastr.error(error.message, 'Ohh NO! Something went wrong');
    });
  }

}
