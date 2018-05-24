"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var order_details_component_1 = require("../core/order-details/order-details.component");
var Order_1 = require("../core/Order");
var MyOrdersComponent = /** @class */ (function () {
    function MyOrdersComponent(auth, db, route, dialogService) {
        this.auth = auth;
        this.db = db;
        this.route = route;
        this.dialogService = dialogService;
        this.ordered = [];
        this.sliceOrdered = [];
    }
    MyOrdersComponent.prototype.ngOnInit = function () {
        if (this.auth.hasLogged()) {
            this.loadOrders();
        }
    };
    MyOrdersComponent.prototype.showDetails = function (item) {
        var _this = this;
        console.log(item);
        this.db.object('RegisteredUsers/' + item.uid).snapshotChanges().subscribe(function (snapshot) {
            _this.showDialog(snapshot.payload.val());
        });
    };
    MyOrdersComponent.prototype.showConfirm = function (value) {
        var refData = this.db.database.ref('MyOrder/' + value.uid + '/' + value.key + '/' + 'status');
        console.log('MyOrder/' + value.uid + '/' + value.key + '/' + 'status');
        refData.on('value', function (confirmOrder) {
            value.status = 'Confirmed';
        });
        refData.set('Confirmed');
    };
    MyOrdersComponent.prototype.pageChanged = function (event) {
        var startItem = (event.page - 1) * event.itemsPerPage;
        var endItem = event.page * event.itemsPerPage;
        this.sliceOrdered = this.ordered.slice(startItem, endItem);
    };
    MyOrdersComponent.prototype.showDialog = function (snapshot) {
        var initialState = {
            address: snapshot.address,
            phone: snapshot.number,
            pinCode: snapshot.pinCode,
            name: snapshot.name
        };
        var disposable = this.dialogService.show(order_details_component_1.OrderDetailsComponent, { initialState: initialState });
        // We can close dialog calling disposable.unsubscribe();
        // If dialog was not closed manually close it by timeout
        setTimeout(function () {
            disposable.hide();
        }, 10000);
    };
    MyOrdersComponent.prototype.loadOrders = function () {
        var _this = this;
        this.db.list('MyOrder').snapshotChanges(['child_removed']).subscribe(function (values) {
            _this.ordered = [];
            console.log('loading');
            values.forEach(function (value) {
                var uid = value.key;
                var jsonObject = value.payload.val();
                for (var key in jsonObject) {
                    if (key == null) {
                        continue;
                    }
                    var order = new Order_1.Order();
                    var object = jsonObject[key];
                    order.key = key;
                    order.uid = uid;
                    order.name = object.name;
                    order.date = object.date;
                    order.id = object.id;
                    order.time = object.time;
                    order.quantity = object.quantity;
                    order.price = object.price;
                    order.status = object.status;
                    _this.ordered.push(order);
                    if (_this.ordered.length > 10 && !(_this.sliceOrdered.length > 0)) {
                        _this.sliceOrdered = _this.ordered.slice(0, 10);
                    }
                }
            });
            if (_this.ordered.length <= 10) {
                _this.sliceOrdered = _this.ordered;
            }
        });
    };
    MyOrdersComponent = __decorate([
        core_1.Component({
            selector: 'app-my-orders',
            templateUrl: './my-orders.component.html',
            styleUrls: ['./my-orders.component.css']
        })
    ], MyOrdersComponent);
    return MyOrdersComponent;
}());
exports.MyOrdersComponent = MyOrdersComponent;
