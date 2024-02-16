import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public data = new BehaviorSubject(false);
  public class = new BehaviorSubject('');
  public message = new BehaviorSubject('');
  constructor() { }

  error(message:string) {
    this.data.next(true)
    this.class.next('alertBannerIn')
    this.message.next(message);


    setTimeout(() => {
    this.class.next('alertBannerOut')
     console.log("after 2 secs: ", alert);
    }, 2000);
  }

  success(message:string) {
    this.data.next(true)
    this.class.next('alertBannerIn')
    this.message.next(message);


    setTimeout(() => {
    this.class.next('alertBannerOut')
     console.log("after 2 secs: ", alert);
    }, 2000);
  }
}
