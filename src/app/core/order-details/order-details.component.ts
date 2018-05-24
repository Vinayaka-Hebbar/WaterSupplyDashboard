import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

export interface OrderDetailsModel {
  address: string;
  phone: number;
  pinCode: number;
  name: string;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OrderDetailsModel, OnInit {
  name: string;
  address: string;
  phone: number;
  pinCode: number;

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit(): void {
  }

}
