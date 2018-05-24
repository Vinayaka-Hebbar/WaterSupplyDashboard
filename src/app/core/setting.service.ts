import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';

@Injectable()
export class SettingService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  public getItem(key: string, defaultValue: any): any {
    const item = this.storage.get(key);
    return item == null ? defaultValue : item;
  }

  public setItem(key: string, value: any): void {
    this.storage.set(key, value);
  }

}
