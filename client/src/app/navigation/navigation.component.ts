import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '@app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  currentUser: User;
  returnUrl: string;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
   logout() {
        this.authenticationService.logout();
        this.router.navigate([this.returnUrl]);
    }

}
