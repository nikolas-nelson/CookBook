import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {CoursesModalComponent} from "./courses-modal/courses-modal.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courses: any;
  public loading = true;

  constructor(private recipeService: RecipeService,
              private modalService: NgbModal,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loading = false;
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
