import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { LocalService } from './Components/localStorage/local-storage.service';
import { HttpClient } from '@angular/common/http';
import Appsettings from './Components/AppSettings';
import { SearchComponent } from './Components/search/search.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationService } from './Components/notification/notification.service';

@Component({
  selector: 'app-root',
  providers: [LocalService,],
  standalone: true,
  imports: [SearchComponent, RouterOutlet, MatDividerModule, CommonModule, ReactiveFormsModule, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  activeLink = "";
  title = 'deskbuddy';
  form = this.fb.group({
    searchText: ['']
  })
  foundItems: any = [];

  constructor(private sanitizer: DomSanitizer, private router: Router, private http: HttpClient, public notificationService: NotificationService, public store: LocalService, @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    if (this.store?.getUserSettings() === null) {
      let data = {
        id: 1
      }
      this.store.setSettings(data);
    }
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

  changeClass(tab: any, tab2?: any) {
    tab.classList?.remove("active")
    if (tab2) {
      tab2.classList.remove("active")
    }
  }

  change(value: any) {
    if (value) {
      this.http.get(Appsettings.API_ENDPOINT + "/findItemBySearchText/" + this.form.get('searchText')?.value).subscribe((res: any) => {
        res.forEach((x: any) => {
          x.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.image1)
        })
        this.foundItems = res;
      })
    }
    if (!this.form.get('searchText')?.value) {
      this.foundItems = []
    }

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


