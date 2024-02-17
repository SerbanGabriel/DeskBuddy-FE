import { CommonModule, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from 'express';
import { LocalService } from '../localStorage/local-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NewsComponent } from '../home/news/news.component';
import { DomSanitizer } from '@angular/platform-browser';
import Appsettings from '../AppSettings';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-search',
  standalone: true,
  providers: [LocalService],
  imports: [NewsComponent, MatCardModule,MatDividerModule, MatButtonModule, NgOptimizedImage, HttpClientModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @Input() items:any

  constructor(private notification: NotificationService, public store: LocalService, private sanitizer: DomSanitizer, private http: HttpClient) {
  }
   ngOnInit() {
  }


  addToCart(item: any) {
    this.http.post(Appsettings.API_ENDPOINT + "/addToCart/" + item.id + "/" + this.store.getUserSettings().id, {}).subscribe(() => {
      this.notification.success("Item added to cart!")

    })
  }
}
