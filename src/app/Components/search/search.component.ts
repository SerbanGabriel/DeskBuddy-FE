import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

   constructor(@Inject(DOCUMENT) private document: Document){

   }


  ngOnInit(): void {
    const activeElement = this.document.getElementById(this.document.location.pathname.replace('/', ''))
    activeElement?.classList.add("active")
  }

}
