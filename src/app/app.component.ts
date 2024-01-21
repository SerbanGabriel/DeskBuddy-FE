import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  activeLink = "";
  title = 'deskbuddy';
  form = this.fb.group({
    searchText:''
  })

  constructor(@Inject(DOCUMENT) private document: Document,
              private fb:FormBuilder){

  }

  ngOnInit(): void {
     this.changeActiveElement()
  }

  changeActiveElement(){
    console.log(this.document.location.pathname.replace('/',''))
    const activeElement = this.document.getElementById(this.document.location.pathname.replace('/',''))
    activeElement?.classList.add("active")
  }

  changeClass(event: any){
   event.classList.remove("active")
  }

  searchElement(){
    console.log(this.form.value)
  }
} 
