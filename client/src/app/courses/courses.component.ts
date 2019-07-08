import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courses: any;
  public loading = true;

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.recipeService.getCourses().subscribe(courses => {
      this.courses = courses;
      this.loading = false;
    })
  }

}
