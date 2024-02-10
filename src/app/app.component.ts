import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatDividerModule, CommonModule, ReactiveFormsModule,LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  activeLink = "";
  title = 'deskbuddy';
  form = this.fb.group({
    searchText: ''
  })

  constructor(@Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.changeActiveElement()
  }

  changeActiveElement() {
    if (this.document.location.pathname === '/') {
      const activeElement = this.document.getElementById('home')
      activeElement?.classList.add("active")
      return;
    }

    const activeElement = this.document.getElementById(this.document.location.pathname.replace('/', ''))
    activeElement?.classList.add("active")
  }

  changeClass(event: any) {
    event.forEach((x:any) => x.classList.remove("active"))
  }

  searchElement() {
    console.log(this.form.value)
  }

  showDropdown(accountForm:any,accountImg:any){
    accountForm.classList.add('show')
    accountImg.classList.add('onForm')
  }

  hideDropdown(accountForm:any,accountImg:any){
    accountForm.classList.remove('show')
    accountImg.classList.remove('onForm')
  }
  
} 
