import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { LocalService } from '../localStorage/local-storage.service';
import { SingleFileUploadComponent } from '../single-file-upload/single-file-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-user-data',
    standalone: true,
    providers: [SingleFileUploadComponent, LocalService],
    templateUrl: './user-data.component.html',
    styleUrl: './user-data.component.scss',
    imports: [MatInputModule,MatProgressSpinnerModule, MatIconModule,CommonModule, ReactiveFormsModule, FormsModule, MatButtonModule, SingleFileUploadComponent]
})
export class UserDataComponent implements OnInit {
  form = this.fb.group({
    firstName: '',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  constructor(public fileService:SingleFileUploadComponent, private fb:FormBuilder, private store: LocalService){
  }

  ngOnInit(): void {
    const userData = this.store.getUserSettings()
    this.form.patchValue({
      firstName: userData?.firstName
    })
  }

  clear(formControlName:string){
    this.form.get(formControlName)?.setValue('')
  }
}
