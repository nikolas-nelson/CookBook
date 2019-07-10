import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../../models/course';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RecipeService} from '../../../recipe.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-courses-modal',
  templateUrl: './courses-modal.component.html',
  styleUrls: ['./courses-modal.component.scss']
})
export class CoursesModalComponent implements OnInit {

  courseForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  @Input() course: Course;

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private recipeService: RecipeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.course) {
      this.courseForm = this.fb.group({
        id: [this.course.id],
        name: [this.course.name, Validators.required]
      });
    } else {
       this.courseForm = this.fb.group({
        id: [null],
        name: ['', Validators.required]
      });
    }
  }

    onSubmit() {
    if (this.course) {
      this.recipeService.editCourse(this.courseForm.value).subscribe(res => {
        this.activeModal.close(res);
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    } else {
      this.recipeService.addCourse(this.courseForm.value).subscribe(res => {
        this.activeModal.close(res);
      }, (error) => {
        this.toastr.error(error.message, 'Ohh NO! Something went wrong');
      });
    }
  }
}
