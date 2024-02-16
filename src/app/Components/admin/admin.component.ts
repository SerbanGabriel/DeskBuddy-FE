import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SingleFileUploadComponent } from '../single-file-upload/single-file-upload.component';
import { LocalService } from '../localStorage/local-storage.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  providers:[SingleFileUploadComponent,LocalService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  itemForm = this.fb.group({
    title:['', [Validators.required, Validators.max(20)]],
    description:['',[Validators.required]],
    price:['',[Validators.required]],
    count:''
  })


  constructor(public fileService:SingleFileUploadComponent, private fb:FormBuilder){

  }

 save(){
  this.fileService.save();
 }
}
