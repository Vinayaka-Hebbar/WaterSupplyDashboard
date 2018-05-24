import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Delivery} from '../core/Delivery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  delivers: Array<Delivery> = [];
  constructor(private fs: AngularFirestore) { }

  ngOnInit() {
    this.fs.collection<Delivery>('delivery').valueChanges().subscribe(values => {
      this.delivers = values;
    });
  }

}
