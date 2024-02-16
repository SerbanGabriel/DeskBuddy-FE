import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { LocalService } from './Components/localStorage/local-storage.service';
import { NotificationService } from './Components/notification-service/notification.service';

@Component({
  selector: 'app-root',
  providers:[LocalService,],
  standalone: true,
  imports: [RouterOutlet,MatDividerModule, CommonModule, ReactiveFormsModule, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  activeLink = "";
  title = 'deskbuddy';
  form = this.fb.group({
    searchText: ''
  })

  constructor(public notificationService:NotificationService, public store: LocalService, @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.changeActiveElement()
  }

  changeActiveElement() {
    const activeRoute = this.document.location.pathname.replace('/', '')

    if (activeRoute === '') {
      const activeElement = this.document.getElementById('home')
      activeElement?.classList.add("active")
      return
    }
    if (this.document.location.pathname === '/') {
      const activeElement = this.document.getElementById(activeRoute)
      activeElement?.classList.add("active")
      return;
    }

    const activeElement = this.document.getElementById(activeRoute)
    activeElement?.classList.add("active")
  }

  changeClass(tab: any,tab2?:any) {
    tab.classList?.remove("active")
    if(tab2){
      tab2.classList.remove("active")
    }
  }

  searchElement() {
  }

  showDropdown(accountForm: any, accountImg: any) {
    accountForm.classList.add('show')
    accountImg.classList.add('onForm')
  }

  hideDropdown(accountForm: any, accountImg: any) {
    accountForm.classList.remove('show')
    accountImg.classList.remove('onForm')
  }

} 


