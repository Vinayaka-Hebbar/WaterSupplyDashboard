import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {
  scrollCallback;
  yearCount: number;
  years: Array<number> = [];

  constructor(public dialogRef: MatDialogRef<YearSelectorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.scrollCallback = this.getYears.bind(this);
  }

  ngOnInit() {
    this.yearCount = this.data;
    this.years.push(this.yearCount);
    this.getYears();
  }

  getYears() {
    for (let i = 1; i < 9; i++) {
      this.yearCount++;
      this.years.push(this.yearCount);
    }
    return this.years;
  }

  onClicked(value) {
    this.dialogRef.close(value);
  }

}
