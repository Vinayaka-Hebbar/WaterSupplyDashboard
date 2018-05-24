import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Spinner} from 'jquery.spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  primary = '#0e97ff';
  loading = true;
  constructor(auth: AuthenticationService, router: Router) {
    console.log(auth.hasLogged());
    auth.user.subscribe(
      (user) => {
        if (user) {
          auth.userDetails = user;
          router.navigate(['dashboard']);
        } else {
          router.navigate(['login']);
        }
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {

  }
}
