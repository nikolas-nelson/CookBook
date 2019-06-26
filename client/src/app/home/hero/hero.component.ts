import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../recipe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {



  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router,
              private toastr: ToastrService) {


  }





  ngOnInit() {


  }

}
