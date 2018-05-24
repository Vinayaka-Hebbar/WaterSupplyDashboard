import {Component, OnInit} from '@angular/core';
import {SettingService} from '../core/setting.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  enableReport = false;

  constructor(private setting: SettingService) {
  }

  ngOnInit() {
    this.enableReport = this.setting.getItem('enableReport', false);
  }

  onEnableReport(event) {
    this.setting.setItem('enableReport', this.enableReport);
  }
}
