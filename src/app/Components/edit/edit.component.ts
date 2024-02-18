import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LocalService } from '../localStorage/local-storage.service';
import { SingleFileUploadComponent } from '../single-file-upload/single-file-upload.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers: [SingleFileUploadComponent, LocalService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  itemForm = this.fb.group({
    title: ['', [Validators.required, Validators.max(20)]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    count: '',
    cardId:''
  })


  constructor(private router: Router,private sanitizer: DomSanitizer, private store: LocalService, public fileService: SingleFileUploadComponent, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    let data  = this.store.getEditItem()

    this.fileService.image = data.image.changingThisBreaksApplicationSecurity
    this.itemForm.patchValue({
      title: data.title,
      description: data.description,
      price: data.price,
      cardId:data.id
    })
  }

  save() {
    this.fileService.save(this.itemForm.value).subscribe(data=> {
    this.router.navigate([""]);
    })
  }
}
