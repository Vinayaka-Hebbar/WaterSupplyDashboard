"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DboyDetailsComponent = /** @class */ (function () {
    function DboyDetailsComponent(bsModalRef, fb, db) {
        this.bsModalRef = bsModalRef;
        this.fb = fb;
        this.db = db;
        this.saved = new core_1.EventEmitter();
        this.locations = [];
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
    DboyDetailsComponent.prototype.setDBoy = function (dboy) {
        this.dboy = dboy;
        this.userForm.get('name').setValue(dboy.name);
        this.userForm.get('email').setValue(dboy.email);
        this.userForm.get('address').setValue(dboy.address);
        this.userForm.get('age').setValue(dboy.age);
        this.userForm.get('phone').setValue(dboy.phone);
        this.userForm.get('location').setValue(dboy.assign);
    };
    DboyDetailsComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.loadLocations();
    };
    DboyDetailsComponent.prototype.onSave = function () {
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
        }
        else {
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
    };
    DboyDetailsComponent.prototype.loadLocations = function () {
        var _this = this;
        var collection = this.db.collection('locations');
        collection.valueChanges().subscribe(function (results) {
            _this.locations = results;
        });
    };
    DboyDetailsComponent.prototype.buildForm = function () {
        this.userForm = this.fb.group({
            'name': [this.dboy.name, [
                    forms_1.Validators.required
                ]],
            'age': [this.dboy.age, [
                    forms_1.Validators.pattern(/[0-9]{2}/),
                    forms_1.Validators.required
                ]],
            'email': [this.dboy.email, [
                    forms_1.Validators.email,
                    forms_1.Validators.required
                ]],
            'address': [this.dboy.address, [
                    forms_1.Validators.required
                ]],
            'phone': [this.dboy.phone, [
                    forms_1.Validators.required
                ]],
            'location': [this.dboy.assign, [
                    forms_1.Validators.required
                ]]
        });
    };
    DboyDetailsComponent.prototype.closeModal = function () {
        this.bsModalRef.hide();
    };
    DboyDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-dboy-details',
            templateUrl: './dboy-details.component.html',
            styleUrls: ['./dboy-details.component.css']
        })
    ], DboyDetailsComponent);
    return DboyDetailsComponent;
}());
exports.DboyDetailsComponent = DboyDetailsComponent;
