"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OrderDetailsComponent = /** @class */ (function () {
    function OrderDetailsComponent(bsModalRef) {
        this.bsModalRef = bsModalRef;
    }
    OrderDetailsComponent.prototype.ngOnInit = function () {
    };
    OrderDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-order-details',
            templateUrl: './order-details.component.html',
            styleUrls: ['./order-details.component.css']
        })
    ], OrderDetailsComponent);
    return OrderDetailsComponent;
}());
exports.OrderDetailsComponent = OrderDetailsComponent;
