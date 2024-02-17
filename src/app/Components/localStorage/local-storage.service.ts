import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalService {
  private storageName: string = "Settings";

  constructor() { }

  setSettings(data: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageName, JSON.stringify(data));
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('key', 'value');
    } else {
      console.log('Web Storage is not supported in this environment.');
    }
   
  }

  getUserSettings() {
    if (typeof localStorage !== 'undefined') {
      let data:any = localStorage.getItem(this.storageName);
      return JSON.parse(data);
    } 
  }

  clearUserSettings() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }

}