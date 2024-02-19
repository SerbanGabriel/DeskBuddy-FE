import { Component, OnInit } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import AppSettings from '../AppSettings';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import Appsettings from '../AppSettings';
import { LocalService } from '../localStorage/local-storage.service';
import { NotificationService } from '../notification/notification.service';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  providers: [LocalService],
  imports: [NewsComponent,MatCardModule,MatInputModule, MatButtonModule, NgOptimizedImage, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public items: any;

  constructor(private router: Router,private fb: FormBuilder, private notification: NotificationService, public store: LocalService, private sanitizer: DomSanitizer, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getItems()
  }

  getItems() {
    this.http.get(AppSettings.API_ENDPOINT + "/all").subscribe((res: any) => {
      res.forEach((x: any) => {
        x.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.image1)
      })
      this.items = res.sort(function (a:any, b:any) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    })
  }

  delete(item: any) {
    this.http.delete(Appsettings.API_ENDPOINT + "/deleteItem/" + item.id).subscribe(() => {
      this.getItems()
      this.notification.success("Item successfuly removed!")
    })
  }

  edit(item:any){
    this.store.editItem(item)
    this.router.navigate(["edit"]);
  }

  addToCart(item: any) {
    this.http.post(Appsettings.API_ENDPOINT + "/addToCart/" + item.id + "/" + this.store.getUserSettings().id, {}).subscribe(() => {
      this.notification.success("Item added to cart!")
      this.getItems()
    })
  }
}
