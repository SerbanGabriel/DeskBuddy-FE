import { CommonModule, DOCUMENT, NgOptimizedImage } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterOutlet } from '@angular/router';
import { LocalService } from '../localStorage/local-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NewsComponent } from '../home/news/news.component';
import { DomSanitizer } from '@angular/platform-browser';
import Appsettings from '../AppSettings';
import { NotificationService } from '../notification/notification.service';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  providers: [LocalService],
  imports: [NewsComponent,RouterOutlet, MatCardModule,MatDividerModule, MatButtonModule, NgOptimizedImage, HttpClientModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @Input() items:any
  onEditFromSearch:any;
  constructor(private router:Router, private notification: NotificationService, public store: LocalService, private sanitizer: DomSanitizer, private http: HttpClient) {
  }
   ngOnInit() {
  }

  edit(item:any){
    this.store.editItem(item)
    this.onEditFromSearch= true
    this.router.navigate(["edit"]);
  }

  
  delete(item: any) {
    this.http.delete(Appsettings.API_ENDPOINT + "/deleteItem/" + item.id).subscribe(() => {
      this.notification.success("Item successfuly removed!")
      this.items = this.items.filter((x:any) => x.id !== item.id);
    })
  }


  addToCart(item: any) {
    this.http.post(Appsettings.API_ENDPOINT + "/addToCart/" + item.id + "/" + this.store.getUserSettings().id, {}).subscribe(() => {
      this.notification.success("Item added to cart!")
    })
  }
}
