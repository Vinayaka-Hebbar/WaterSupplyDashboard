import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {AngularFirestore} from 'angularfire2/firestore';
import {DBoy} from '../../delivery-boys/delivery-boys.component';
import {Status} from '../Status';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})

export class OrderConfirmComponent implements OnInit {
  confirmGroup: FormGroup;
  dboys: Array<DBoy> = [];
  pinCode: number;
  confirm: EventEmitter<Status> = new EventEmitter();

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.buildConfirmForm();
    this.loadDeliveryBoys();
  }

  closeForm() {
    this.bsModalRef.hide();
  }

  onSubmit() {

    function getDate() {
      const currentDate = new Date();
      return currentDate.getDate() + '/'
        + currentDate.getMonth() + '/'
        + currentDate.getFullYear() + ' '
        + currentDate.getHours() + ':'
        + currentDate.getMinutes() + ':'
        + currentDate.getSeconds();
    }

    const uid = this.confirmGroup.get('assign').value;
    const order: Status = {
      dboyId: uid,
      orderDate: getDate(),
      value: 'Confirmed'
    };
    this.confirm.emit(order);

    this.bsModalRef.hide();
  }

  private loadDeliveryBoys() {
    this.db.collection<DBoy>('dboys').snapshotChanges().subscribe(values => {
      this.dboys = [];
      values.forEach(value => {
        const dboy = value.payload.doc.data() as DBoy;
        dboy.key = value.payload.doc.id;
        this.dboys.push(dboy);
      });
    });
  }

  private buildConfirmForm() {
    this.confirmGroup = this.fb.group({
      'assign': ['', [
        Validators.required
      ]]
    });
  }

}
