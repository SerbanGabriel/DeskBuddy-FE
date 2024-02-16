import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  itemForm = this.fb.group({
    productTitle:'',
    productDescription:'',
    productPrice:'',
    productCount:''
  })
  constructor(private fb:FormBuilder){

  }

  saveItem(){
    
  }

}
