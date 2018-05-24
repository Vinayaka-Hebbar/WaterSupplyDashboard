import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {BsModalService} from 'ngx-bootstrap/modal';
import {OrderDetailsComponent} from '../core/order-details/order-details.component';
import {PageChangedEvent} from 'ngx-bootstrap';
import {Order} from '../core/Order';
import {OrderConfirmComponent} from '../core/order-confirm/order-confirm.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {Delivery} from '../core/Delivery';
import {Status} from '../core/Status';
import {SettingService} from '../core/setting.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  ordered: Array<Order> = [];
  enableReport = false;
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  sliceOrdered: Array<Order> = [];

  constructor(private auth: AuthenticationService, private db: AngularFireDatabase,
              private dialogService: BsModalService, private fs: AngularFirestore, private setting: SettingService) {
  }

  ngOnInit() {
    if (this.auth.hasLogged()) {
      this.loadOrders();
    }
    this.enableReport = this.setting.getItem('enableReport', false);
  }

  showDetails(item: Order) {
    this.db.object('RegisteredUsers/' + item.uid).snapshotChanges().subscribe((snapshot) => {
      this.showDialog(snapshot.payload.val());
    });
  }

  showConfirm(value: Order) {
    const pinCode = /[0-9]+$/.exec(value.dest).toString();
    const date = new Date();
    const disposable = this.dialogService.show(OrderConfirmComponent);
    disposable.content.confirm.subscribe(response => {
      const refData = this.db.database.ref('MyOrder/' + value.uid + '/' + value.key + '/' + 'status');
      const order: Status = {
        dboyId: response.dboyId,
        orderDate: response.orderDate,
        value: 'Confirmed'
      };
      refData.on('value', function (confirmOrder) {
        value.status = order;
      });

      refData.set(order);
      const delivery: Delivery = {
        orderId: value.key,
        status: 'Dispatched',
        address: value.dest,
        dboyId: order.dboyId,
        userId: value.uid,
        date: order.orderDate
      };
      const dboyDoc = this.fs.collection('dboys').doc(response.dboyId);
      if (this.enableReport) {
        const month = this.monthNames[date.getMonth()];
        this.fs.collection('reports').doc(pinCode).
        collection(date.getFullYear().toString()).doc(month).
        collection(month + 'Delivery').doc(delivery.orderId).set(delivery);
      }
      this.fs.collection('delivery').doc(delivery.orderId).set(delivery).then(() => {
        dboyDoc.update({busy: true});
      });
    });
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.sliceOrdered = this.ordered.slice(startItem, endItem);
  }

  sortByPending() {
    const filteredList = this.ordered.filter((value => {
      return value.status.value === 'Pending';
    }));
    if (filteredList.length > 10) {
      this.sliceOrdered = filteredList.slice(0, 10);
    } else {
      this.sliceOrdered = filteredList;
    }
  }

  private showDialog(snapshot: any) {
    const initialState = {
      address: snapshot.address,
      phone: snapshot.number,
      pinCode: snapshot.pinCode,
      name: snapshot.name
    };
    const disposable = this.dialogService.show(OrderDetailsComponent, {initialState});

    // We can close dialog calling disposable.unsubscribe();
    // If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.hide();
    }, 10000);
  }

  private loadOrders() {
    this.db.list('MyOrder').snapshotChanges(['child_removed']).subscribe(values => {
      this.ordered = [];
      console.log('loading');
      values.forEach(value => {
        const uid = value.key;
        const jsonObject = value.payload.val();
        for (const key in jsonObject) {
          if (key == null) {
            continue;
          }
          const order = new Order();
          const object = jsonObject[key];
          order.key = key;
          order.uid = uid;
          order.date = object.date;
          order.id = object.id;
          order.time = object.time;
          order.quantity = object.quantity;
          order.dest = object.dest;
          order.price = object.price;
          order.imageUrl = object.imageUrl;
          order.status = object.status;
          this.ordered.push(order);
          if (this.ordered.length > 10 && !(this.sliceOrdered.length > 0)) {
            this.sliceOrdered = this.ordered.slice(0, 10);
          }
        }
      });
      if (this.ordered.length <= 10) {
        this.sliceOrdered = this.ordered;
      }
    });

  }
}
