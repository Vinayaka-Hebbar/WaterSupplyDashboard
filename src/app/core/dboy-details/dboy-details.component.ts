import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {DBoy} from '../../delivery-boys/delivery-boys.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Marker} from '../../locations/locations.component';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-dboy-details',
  templateUrl: './dboy-details.component.html',
  styleUrls: ['./dboy-details.component.css']
})
export class DboyDetailsComponent implements OnInit {

  saved: EventEmitter<DBoy> = new EventEmitter<DBoy>();
  uid: string;
  dboy: DBoy;
  userForm: FormGroup;
  locations: Array<Marker> = [];

  constructor(private bsModalRef: BsModalRef, private fb: FormBuilder, private db: AngularFirestore) {
    this.dboy = {
      name: '',
      uid: '',
      email: '',
      address: '',
      age: 20,
      phone: 0,
      assign: ''
    };
  }

  setDBoy(dboy: DBoy) {
    this.dboy = dboy;
    this.userForm.get('name').setValue(dboy.name);
    this.userForm.get('email').setValue(dboy.email);
    this.userForm.get('address').setValue(dboy.address);
    this.userForm.get('age').setValue(dboy.age);
    this.userForm.get('phone').setValue(dboy.phone);
    this.userForm.get('location').setValue(dboy.assign);
  }

  ngOnInit() {
    this.buildForm();
    this.loadLocations();
  }

  onSave() {
    function guid() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4();
    }

    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    if (!this.dboy.uid) {
      this.uid = guid();
    } else {
      this.uid = this.dboy.uid;
    }
    this.dboy.name = this.userForm.get('name').value;
    this.dboy.uid = this.uid;
    this.dboy.email = this.userForm.get('email').value;
    this.dboy.address = this.userForm.get('address').value;
    this.dboy.age = this.userForm.get('age').value;
    this.dboy.phone = this.userForm.get('phone').value;
    this.dboy.assign = this.userForm.get('location').value;
    this.saved.emit(this.dboy);
    this.bsModalRef.hide();

  }

  private loadLocations() {
    const collection = this.db.collection<Marker>('locations');
    collection.valueChanges().subscribe(results => {
      this.locations = results;
    });
  }

  private buildForm() {
    this.userForm = this.fb.group({
      'name': [this.dboy.name, [
        Validators.required
      ]],
      'age': [this.dboy.age, [
        Validators.pattern(/[0-9]{2}/),
        Validators.required
      ]],
      'email': [this.dboy.email, [
        Validators.email,
        Validators.required
      ]],
      'address': [this.dboy.address, [
        Validators.required
      ]],
      'phone': [this.dboy.phone, [
        Validators.required
      ]],
      'location': [this.dboy.assign, [
        Validators.required
      ]]
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  }

}
