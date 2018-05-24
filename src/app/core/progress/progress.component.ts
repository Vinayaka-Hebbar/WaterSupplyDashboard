import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  progressEl: any;
  progress;
  progressVisible = false;
  constructor() { }

  ngOnInit() {
    this.progress = $('.progress-button').addClass('loading');
  }


}
