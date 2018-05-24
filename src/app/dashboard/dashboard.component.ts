import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  orderCount = 0;

  constructor(private auth: AuthenticationService, private db: AngularFireDatabase) {
    if (!this.auth.hasLogged()) {
      auth.user.subscribe(
        (user) => {
          if (user) {
            auth.userDetails = user;
          } else {
            window.location.href = 'login';
          }
        }
      );
    }
  }

  ngOnInit() {
    this.db.object('MyOrder/orderCount').snapshotChanges().subscribe(result => {
      this.orderCount = result.payload.val();
    });
  }

  signOut() {
    this.auth.signOut();
  }
}
