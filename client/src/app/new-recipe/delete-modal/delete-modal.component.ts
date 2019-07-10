import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  @Input() data;

  constructor(public activeModal: NgbActiveModal,
              private recipeService: RecipeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {

  }


  delete(id) {
    if (this.data.type === 'allergen') {
      this.recipeService.deleteAllergen(id).subscribe(res => {
        this.activeModal.close(res);
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    } else if (this.data.type === 'category') {
      this.recipeService.deleteCategory(id).subscribe(res => {
        this.activeModal.close(res);
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    } else if (this.data.type === 'course') {
      this.recipeService.deleteCourse(id).subscribe(res => {
        this.activeModal.close(res);
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    } else {
      this.toastr.error('Ohh NO! Something went wrong');
    }
  }
}
