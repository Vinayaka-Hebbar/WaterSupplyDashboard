import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export interface Marker {
  lat: number;
  lng: number;
  label: string;
  full: string;
  hasSaved?: boolean;
  pinCode?: number;
  id?: string;
}

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  lat = 12.971599;
  lng = 77.594563;
  counter = 0;
  zoom = 9;
  circleVisible = false;
  markerCollection: AngularFirestoreCollection<Marker>;
  markers: Array<Marker> = [];
  newMarkers: Array<Marker> = [];

  constructor(private db: AngularFirestore, private http: HttpClient) {
  }

  ngOnInit() {
    this.markerCollection = this.db.collection('locations');
    this.markerCollection.snapshotChanges().map(actions => {
      return actions.map(value => {
        const data = value.payload.doc.data() as Marker;
        data.id = value.payload.doc.id;
        return data;
      });
    }).subscribe(values => {
      const tempMarker = [];
      values.forEach(value => {
        tempMarker.push(value);
      });
      this.markers = tempMarker;
    });
  }

  mapClicked(event) {
    const lat = event.coords.lat;
    const lng = event.coords.lng;
    console.log('please wait');
    this.getLocationDetails(lat, lng).subscribe(responce => {
      const results = responce.results;
      if (results.length === 0) {
        console.log('failed');
        return;
      }
      const city: Array<any> = results[0].address_components;
      let full = '';
      let pinCode = 0;
      let label = '';
      console.log(city);
      if (/^Unnamed.*/.test(city[0].long_name)) {
        city[0].long_name = '';
      }
      city.forEach(value => {
        if (value.types.includes('sublocality')) {
          label += value.long_name + ' ';
          full += value.long_name + ' ';
        } else if (value.types.includes('postal_code')) {
          pinCode = value.long_name;
        } else if (value.types.includes('route') || value.types.includes('street_number') || value.types.includes('premise')) {
          full += value.long_name + ' ';
        } else if (value.types.includes('political') && !value.types.includes('administrative_area_level_2')) {
          full += value.long_name + ' ';
        }
      });
      const marker: Marker = {
        label: label,
        full: full,
        lat: lat,
        lng: lng,
        pinCode: pinCode,
        hasSaved: true
      };
      this.newMarkers.push(marker);
      this.counter++;
      console.log('done');
    });
  }

  private onLocationClick(marker: Marker) {
    this.lat = marker.lat;
    this.lng = marker.lng;
    this.zoom = 14;
    this.circleVisible = true;
  }

  private getLocationDetails(lat: number, lng: number): Observable<any> {
    if (location.protocol === 'https:') {
      return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng);
    }
    return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng);
  }

  private saveLocation(marker: Marker) {
    const newMarker: Marker = {
      label: marker.label,
      lat: marker.lat,
      full: marker.full,
      lng: marker.lng,
      pinCode: marker.pinCode
    };
    this.newMarkers.splice(this.newMarkers.indexOf(marker), 1);
    this.markerCollection.doc(newMarker.pinCode + '-' + newMarker.label.split(' ')[0]).set(newMarker);
    this.counter--;
  }

  private removeMarker(marker: Marker) {
    this.markerCollection.doc(marker.id).delete();
  }

  private removeNewMarker(marker: Marker) {
    this.newMarkers.splice(this.newMarkers.indexOf(marker), 1);
    this.counter--;
  }

}
