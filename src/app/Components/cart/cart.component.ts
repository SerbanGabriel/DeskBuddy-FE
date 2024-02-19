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
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-cart',
  standalone: true,
  providers: [LocalService],
  imports: [NewsComponent, MatDivider, ReactiveFormsModule, MatIconModule, MatInputModule, MatCardModule, MatButtonModule, NgOptimizedImage, HttpClientModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: any;
  payForm = this.fb.group({
    name: [''],
    number: [''],
    expirationDate: ["", [Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/), Validators.required]],
    csv: []
  })
  total: any = 0;

  constructor(public fb: FormBuilder, private notificationService: NotificationService, private sanitizer: DomSanitizer, private http: HttpClient, private store: LocalService) {

  }

  ngOnInit(): void {
    this.getItems()
  }

  public change(event: any) {

  }


  pay() {
  }

  getItems() {
    const id = this.store.getUserSettings()?.id
    if (id) {
      this.http.get(Appsettings.API_ENDPOINT + "/userItems/" + id, {}).subscribe((res: any) => {
        res.items.forEach((x: any) => {
          if (x.count === 0) {
            this.total = x.price
          }
          else {
            this.total = this.total + (x.price * x.userItemCount)
          }
          this.total = Number(this.total.toFixed(2));
          x.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.image1)
        })

        this.items = res.items.sort((a:any,b:any)=> a-b)

        if (this.items.length == 0) {
          this.notificationService.error("No Items in cart")
          this.total = 0;
        }
      })
    }

  }

  delete(item: any) {
    this.http.get(Appsettings.API_ENDPOINT + "/deleteItemFromUser/" + item.id + "/" + this.store.getUserSettings().id, {}).subscribe((res: any) => {
      this.total = 0
      this.getItems();
    })
  }

  removeCount(item: any) {
    
    this.http.delete(Appsettings.API_ENDPOINT + "/removeCountItem/" + item.id + "/" + this.store.getUserSettings().id).subscribe((res: any) => {
      this.total = 0
      this.getItems();
    })
  }

  addCount(item: any) {
    this.http.get(Appsettings.API_ENDPOINT + "/addItemCount/" + item.id + "/" + this.store.getUserSettings().id, {}).subscribe((res: any) => {
      this.total = 0
      this.getItems();
    })
  }

  checkForErrorsIn(formControl: AbstractControl): string {
    if (formControl.hasError('required')) {
      return 'Min value is required'
    }

    if (formControl.hasError('min') || formControl.hasError('max')) {
      return 'Value must be between 1980 and 2020';
    }
    return ''
  }
}
