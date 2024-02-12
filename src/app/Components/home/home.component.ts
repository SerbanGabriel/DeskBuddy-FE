import { Component, OnInit } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import AppSettings  from '../AppSettings';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common'
import {MatCardModule} from '@angular/material/card';
interface item{
  name:string,
  description:string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent,MatCardModule,NgOptimizedImage,HttpClientModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})


export class HomeComponent implements OnInit{
  items:any;

  constructor( private http: HttpClient){

  }

  ngOnInit(): void {
    console.log("HomeComponent")  
    this.http.get(AppSettings.API_ENDPOINT + "/all").subscribe(res => {
      this.items = res;
    })
  }
}
