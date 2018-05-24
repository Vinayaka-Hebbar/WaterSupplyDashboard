import {Component, OnInit} from '@angular/core';
import {AppUser} from '../core/AppUser';
import {AuthenticationService} from '../authentication.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  users: Array<AppUser> = [];

  constructor(private auth: AuthenticationService, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.db.list('RegisteredUsers').snapshotChanges().subscribe(values => {
      values.forEach(value => {
        const user = new AppUser();
        user.uid = value.key;
        const object = value.payload.val();
        user.name = object.name;
        user.address = object.address;
        this.users.push(user);
      });
    });
  }

}
