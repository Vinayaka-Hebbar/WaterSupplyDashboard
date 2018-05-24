"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dboy_details_component_1 = require("../core/dboy-details/dboy-details.component");
var DeliveryBoysComponent = /** @class */ (function () {
    function DeliveryBoysComponent(db, dialogService) {
        this.db = db;
        this.dialogService = dialogService;
        this.dboys = [];
    }
    DeliveryBoysComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dboysCollection = this.db.collection('dboys');
        this.dboysCollection.snapshotChanges(['added', 'removed', 'modified']).subscribe(function (results) {
            _this.dboys = [];
            results.forEach(function (value) {
                var dboy = value.payload.doc.data();
                dboy.key = value.payload.doc.id;
                _this.dboys.push(dboy);
            });
        });
    };
    DeliveryBoysComponent.prototype.addDetails = function ($event) {
        var _this = this;
        var disposable = this.dialogService.show(dboy_details_component_1.DboyDetailsComponent);
        disposable.content.saved.subscribe(function (data) {
            _this.dboysCollection.add(data);
        });
    };
    DeliveryBoysComponent.prototype.onRemove = function (user) {
        console.log(user);
        this.dboysCollection.doc(user.key).delete();
    };
    DeliveryBoysComponent.prototype.onEdit = function (user) {
        var _this = this;
        var disposable = this.dialogService.show(dboy_details_component_1.DboyDetailsComponent);
        disposable.content.saved.subscribe(function (data) {
            var updatedDBoy = {
                name: data.name,
                uid: data.uid,
                email: data.email,
                address: data.address,
                age: data.age,
                phone: data.phone,
                assign: data.assign
            };
            _this.dboysCollection.doc(data.key).update(data);
        });
        disposable.content.setDBoy(user);
    };
    DeliveryBoysComponent = __decorate([
        core_1.Component({
            selector: 'app-delivery-boys',
            templateUrl: './delivery-boys.component.html',
            styleUrls: ['./delivery-boys.component.css']
        })
    ], DeliveryBoysComponent);
    return DeliveryBoysComponent;
}());
exports.DeliveryBoysComponent = DeliveryBoysComponent;
