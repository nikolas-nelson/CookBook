import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

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

}
