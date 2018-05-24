import {Component, OnInit} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Marker} from '../locations/locations.component';
import {Report} from '../core/Report';
import {Chart} from 'chart.js';
import {YearSelectorComponent} from '../core/year-selector/year-selector.component';
import {MatDialog} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  chart = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  yearCollection: AngularFirestoreCollection<any>;
  reports: Array<Report> = [];
  loading = true;
  count = 0;
  selectedYear: string;
  currentYear: string;
  selectedArea: string;
  locations: Array<Marker> = [];

  constructor(private fs: AngularFirestore, public dialog: MatDialog) {
  }

  ngOnInit() {
    const date = new Date();
    this.currentYear = this.selectedYear = date.getFullYear().toString();
    this.fs.collection('locations').snapshotChanges(['added']).subscribe(values => {
      this.locations = [];
      values.forEach(value => {
        const marker: Marker = value.payload.doc.data() as Marker;
        marker.id = value.payload.doc.id;
        this.locations.push(marker);
      });
      this.loadReports();
    });

  }

  onLocationChange(value: string) {
    this.selectedArea = value.split('-')[0];
    this.fetchReports(this.selectedArea);
  }

  private loadReports() {
    if (this.locations.length > 0) {
      const key = this.locations[0].id.split('-')[0];
      this.fetchReports(key);
    }
  }

  private fetchReports(key: string) {
    this.yearCollection = this.fs.doc('reports/' + key).collection(this.selectedYear);
    this.count = 0;
    this.reports = [];
    this.monthNames.forEach(month => {
      this.loadMonthDetails(month);
    });

  }

  private loadMonthDetails(month: string) {

    this.yearCollection.doc(month).collection(month + 'Delivery').valueChanges().subscribe(values => {
      this.reports[month] = {
        count: values.length
      };
      this.count++;
      if (this.count === 12) {
        this.loadChart();
      }
    });
  }

  onYearClick() {
    const ref = this.dialog.open(YearSelectorComponent, {
      data: this.currentYear
    });
    ref.afterClosed().subscribe(value => {
      this.selectedYear = value.toString();
      this.fetchReports(this.selectedArea);
    });
  }

  private loadChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.monthNames,
        datasets: [{
          label: this.selectedYear + ' Delivery Repory',
          data: this.getReportArray()
        }]
      }
    });
    this.loading = false;
  }

  private getReportArray() {
    const values = [];
    this.monthNames.forEach(value => {
      values.push(this.reports[value].count);
    });
    return values;
  }

}
