import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public submitted = false;
  registerForm: FormGroup;

  constructor(private recipeService: RecipeService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router,
              private toastr: ToastrService) {

    this.registerForm = this.fb.group({
      name: ['', Validators.minLength(5)],
      password: ['', [Validators.minLength(5)]],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  ngOnInit() {
  }

  get f() {
    return this.registerForm.controls;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.recipeService.register(this.registerForm.value).subscribe(() => {
        this.toastr.success('You have been successfully registered!');
        setTimeout( () => { this.goHome(); }, 2000 );
      }, (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Ohh NO! Something went wrong');
      }, () => {
      });
    }
  }

}
