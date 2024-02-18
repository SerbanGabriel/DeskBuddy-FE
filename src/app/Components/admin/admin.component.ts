import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SingleFileUploadComponent } from '../single-file-upload/single-file-upload.component';
import { LocalService } from '../localStorage/local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers: [SingleFileUploadComponent, LocalService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  itemForm = this.fb.group({
    title: ['', [Validators.required, Validators.max(20)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    count: '',
    cardId:''
  })


  constructor(private sanitizer: DomSanitizer, private store: LocalService, public fileService: SingleFileUploadComponent, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    let data  = this.store.getEditItem()
    console.log(data)
    this.fileService.image = data.image.changingThisBreaksApplicationSecurity
    this.itemForm.patchValue({
      title: data.title,
      description: data.description,
      price: data.price,
      cardId:data.id
    })
  }

  save() {
    this.fileService.save(this.itemForm.value);
  }
}
