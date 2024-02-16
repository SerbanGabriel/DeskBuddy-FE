import { Component, OnInit } from '@angular/core';
import { LocalService } from '../localStorage/local-storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Appsettings from '../AppSettings';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NewsComponent } from '../home/news/news.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-cart',
  standalone: true,
  providers:[LocalService],
  imports: [NewsComponent, MatIconModule,MatInputModule,MatCardModule,MatButtonModule,NgOptimizedImage,HttpClientModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items:any;

  constructor(private sanitizer: DomSanitizer,private http:HttpClient, private store:LocalService){

  }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.http.get(Appsettings.API_ENDPOINT + "/userItems/"+ this.store.getUserSettings().id,{}).subscribe((res:any) => {
      res.items.forEach((x:any) => {
        x.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x.image1)
      })
      console.log(res.items)
      this.items = res.items
    })
  }

  delete(item:any){
    this.http.get(Appsettings.API_ENDPOINT + "/deleteItemFromUser/" + item.id+ "/"+ this.store.getUserSettings().id,{}).subscribe((res:any) => {
      this.getItems();
    })
  }
}
