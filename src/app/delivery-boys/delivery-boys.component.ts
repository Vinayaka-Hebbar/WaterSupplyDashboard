import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {DboyDetailsComponent} from '../core/dboy-details/dboy-details.component';
import {BsModalService} from 'ngx-bootstrap';

export interface DBoy {
  name: string;
  uid: string;
  email: string;
  age: number;
  phone: number;
  address: string;
  assign: string;
  key?: string;
  busy?: boolean;
}

@Component({
  selector: 'app-delivery-boys',
  templateUrl: './delivery-boys.component.html',
  styleUrls: ['./delivery-boys.component.css']
})
export class DeliveryBoysComponent implements OnInit {
  dboys: Array<DBoy> = [];
  dboysCollection: AngularFirestoreCollection<DBoy>;

  constructor(private db: AngularFirestore, private dialogService: BsModalService) {
  }

  ngOnInit() {
    this.dboysCollection = this.db.collection('dboys');
    this.dboysCollection.snapshotChanges(['added', 'removed', 'modified']).subscribe(results => {
      this.dboys = [];
      results.forEach(value => {
        const dboy = value.payload.doc.data() as DBoy;
        dboy.key = value.payload.doc.id;
        this.dboys.push(dboy);
      });
    });
  }

  addDetails($event) {
    const disposable = this.dialogService.show(DboyDetailsComponent);
    disposable.content.saved.subscribe(data => {
      this.dboysCollection.doc(data.uid).set(data);
    });
  }

  onRemove(user: DBoy) {
    console.log(user);
    this.dboysCollection.doc(user.key).delete();
  }

  onEdit(user: DBoy) {
    const disposable = this.dialogService.show(DboyDetailsComponent);
    disposable.content.saved.subscribe(data => {
      const updatedDBoy: DBoy = {
        name: data.name,
        uid: data.uid,
        email: data.email,
        address: data.address,
        age: data.age,
        phone: data.phone,
        assign: data.assign
      };
      this.dboysCollection.doc(data.key).update(data);
    });
    disposable.content.setDBoy(user);
  }

}
