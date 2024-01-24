import { Component, OnInit } from '@angular/core';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    console.log("HomeComponent")  
  }

}
