import { Component, OnInit } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import AppSettings  from '../AppSettings';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { DomSanitizer } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import Appsettings from '../AppSettings';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent,MatCardModule,MatButtonModule,NgOptimizedImage,HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  public items:any;

  constructor( private sanitizer: DomSanitizer,private http: HttpClient){

  }

  ngOnInit(): void {
    this.getItems()
  }

  getItems(){
    this.http.get(AppSettings.API_ENDPOINT + "/all").subscribe((res:any) => {

      res.forEach((x:any) => {
        x.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x.image1)
      })
       this.items = res
    })
  }

  delete(item:any){
      this.http.delete(Appsettings.API_ENDPOINT + "/deleteItem/" + item.id).subscribe(() => {
        this.getItems()
      })

  }
}
