"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocationsComponent = /** @class */ (function () {
    function LocationsComponent(db, http) {
        this.db = db;
        this.http = http;
        this.lat = 12.971599;
        this.lng = 77.594563;
        this.counter = 0;
        this.zoom = 9;
        this.circleVisible = false;
        this.markers = [];
        this.newMarkers = [];
    }
    LocationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.markerCollection = this.db.collection('locations');
        this.markerCollection.snapshotChanges().map(function (actions) {
            return actions.map(function (value) {
                var data = value.payload.doc.data();
                data.id = value.payload.doc.id;
                return data;
            });
        }).subscribe(function (values) {
            var tempMarker = [];
            values.forEach(function (value) {
                tempMarker.push(value);
            });
            _this.markers = tempMarker;
        });
    };
    LocationsComponent.prototype.mapClicked = function (event) {
        var _this = this;
        var lat = event.coords.lat;
        var lng = event.coords.lng;
        console.log('please wait');
        this.getLocationDetails(lat, lng).subscribe(function (responce) {
            var results = responce.results;
            if (results.length === 0) {
                console.log('failed');
                return;
            }
            var city = results[0].address_components;
            var full = '';
            var pinCode = 0;
            var label = '';
            console.log(city);
            if (/^Unnamed.*/.test(city[0].long_name)) {
                city[0].long_name = '';
            }
            city.forEach(function (value) {
                if (value.types.includes('sublocality')) {
                    label += value.long_name + ' ';
                    full += value.long_name + ' ';
                }
                else if (value.types.includes('postal_code')) {
                    pinCode = value.long_name;
                }
                else if (value.types.includes('route') || value.types.includes('street_number') || value.types.includes('premise')) {
                    full += value.long_name + ' ';
                }
                else if (value.types.includes('political') && !value.types.includes('administrative_area_level_2')) {
                    full += value.long_name + ' ';
                }
            });
            var marker = {
                label: label,
                full: full,
                lat: lat,
                lng: lng,
                pinCode: pinCode,
                hasSaved: true
            };
            _this.newMarkers.push(marker);
            _this.counter++;
            console.log('done');
        });
    };
    LocationsComponent.prototype.onLocationClick = function (marker) {
        this.lat = marker.lat;
        this.lng = marker.lng;
        this.zoom = 14;
        this.circleVisible = true;
    };
    LocationsComponent.prototype.getLocationDetails = function (lat, lng) {
        return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng);
    };
    LocationsComponent.prototype.saveLocation = function (marker) {
        var newMarker = {
            label: marker.label,
            lat: marker.lat,
            full: marker.full,
            lng: marker.lng,
            pinCode: marker.pinCode
        };
        this.newMarkers.splice(this.newMarkers.indexOf(marker), 1);
        this.markerCollection.add(newMarker);
        this.counter--;
    };
    LocationsComponent.prototype.removeMarker = function (marker) {
        this.markerCollection.doc(marker.id).delete();
    };
    LocationsComponent.prototype.removeNewMarker = function (marker) {
        this.newMarkers.splice(this.newMarkers.indexOf(marker), 1);
        this.counter--;
    };
    LocationsComponent = __decorate([
        core_1.Component({
            selector: 'app-locations',
            templateUrl: './locations.component.html',
            styleUrls: ['./locations.component.css']
        })
    ], LocationsComponent);
    return LocationsComponent;
}());
exports.LocationsComponent = LocationsComponent;
