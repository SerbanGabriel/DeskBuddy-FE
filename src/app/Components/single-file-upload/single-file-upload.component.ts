import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import Appsettings from '../AppSettings';
import { LocalService } from '../localStorage/local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, elementAt, finalize } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Injectable()
@Component({
  selector: 'app-single-file-upload',
  standalone: true,

  imports: [RouterOutlet, MatInputModule, MatIconModule, MatButtonModule, MatDividerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './single-file-upload.component.html',
  styleUrl: './single-file-upload.component.scss'
})
export class SingleFileUploadComponent {
  selectedFile: any;
  formData: any = new FormData();
  image:any

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private store: LocalService) { }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      const formData = new FormData();
      formData.append('image', this.selectedFile.file);
      this.selectedFile.pending = true;


      return this.http.post<any>(Appsettings.API_ENDPOINT + "/upload/" + this.store.getUserSettings().id, formData).pipe(finalize(() => this.selectedFile.pending = false)).subscribe({
        next: (res: any) => {
          let user = this.store.getUserSettings();
          let objectURL = 'data:image/png;base64,' + res.photo;
          user.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          user.image = user.image.changingThisBreaksApplicationSecurity
          this.store.setSettings(user)
          this.selectedFile.status = 'ok';
        },
        error: () => {
          this.selectedFile.status = 'fail';
          this.selectedFile.src = '';
        }
      })
    });

    reader.readAsDataURL(file);
  }

  processFileForItemPreview(imageInput: any, itemForm: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      if (this.formData.get('firstImage')) {
        this.formData.set('firstImage', this.selectedFile.file)
      } else {
        this.formData.append('firstImage', this.selectedFile.file);
      }

      const jsonStr = JSON.stringify(itemForm);
      this.formData.append('user', jsonStr);
      return this.http.post<any>(Appsettings.API_ENDPOINT + "/preview", this.formData).pipe(finalize(() => this.selectedFile.pending = false)).subscribe({
        next: (res: any) => {
          let img: any = 'data:image/png;base64,' + res.photo;
          img = this.sanitizer.bypassSecurityTrustUrl(img);
          img = img.changingThisBreaksApplicationSecurity
          this.image = img
        },
      })
    });

    reader.readAsDataURL(file);
  }

  save(value: any) {
    const jsonStr = JSON.stringify(value);
    if (this.formData.get('user')) {
      this.formData.set('user', jsonStr)
    }
    else {
    this.formData.append('user', jsonStr)
    } 
   
    return this.http.post<any>(Appsettings.API_ENDPOINT + "/save", this.formData)
  }
}
