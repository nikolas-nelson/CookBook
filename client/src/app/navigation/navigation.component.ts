import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public isLogin;

  constructor(private authentication: AuthenticationService,
              private router: Router,) {
    this.authentication.islogin.subscribe(x => this.isLogin = x);
    console.log(this.isLogin)
  }

  ngOnInit() {
    // this.isLogin = this.authentication.isLoggedIn()
  }
  logout() {
    this.authentication.logout().subscribe(res => {
      if (res) {
        this.router.navigate(['/']);
        this.ngOnInit()
      }
    });
  }

}
