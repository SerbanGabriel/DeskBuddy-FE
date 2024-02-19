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
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  providers:[LocalService],
  imports: [NewsComponent,ReactiveFormsModule, MatIconModule,MatInputModule,MatCardModule,MatButtonModule,NgOptimizedImage,HttpClientModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items:any;
  payForm= this.fb.group({
    name:['Example Name'],
    number:['***883'],
    expirationDate:["", [Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),Validators.required]],
   csv:[]
  })
  total:any = 0;

  constructor(public fb:FormBuilder, private notificationService:NotificationService, private sanitizer: DomSanitizer,private http:HttpClient, private store:LocalService){

  }

  ngOnInit(): void {
    this.getItems()
  }

  public change(event:any){
   
  }


  pay(){
    console.log(this.payForm.value)
  }

  getItems(){
    this.http.get(Appsettings.API_ENDPOINT + "/userItems/"+ this.store.getUserSettings().id,{}).subscribe((res:any) => {
      res.items.forEach((x:any) => {
        console.log(x)
        if(x.count === 0){
          this.total = x.price
        }
        else{
          this.total = x.price * x.userItemCount
        }        
        this.total = Number(this.total.toFixed(2));
        x.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'+ x.image1)
      })
      
      this.items = res.items
      if(this.items.length == 0){
        this.notificationService.error("No Items in cart")
        this.total = 0;
      }
    })
  }

  delete(item:any){
    this.http.get(Appsettings.API_ENDPOINT + "/deleteItemFromUser/" + item.id+ "/"+ this.store.getUserSettings().id,{}).subscribe((res:any) => {
      this.getItems();
    })
  }

  removeCount(item:any){
    this.http.delete(Appsettings.API_ENDPOINT + "/removeCountItem/" + item.id+ "/"+ this.store.getUserSettings().id).subscribe((res:any) => {
      this.getItems();
    })
  }

  addCount(item:any){
    this.http.get(Appsettings.API_ENDPOINT + "/addItemCount/" + item.id+ "/"+ this.store.getUserSettings().id,{}).subscribe((res:any) => {
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
