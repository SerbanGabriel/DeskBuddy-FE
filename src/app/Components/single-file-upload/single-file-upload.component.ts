import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { LoginFormComponent } from '../login-form/login-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import Appsettings from '../AppSettings';
import { LocalStorage } from '../localStorage/local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {}


  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post<any>(Appsettings.API_ENDPOINT + "/upload" , formData );
  }
}
@Component({
  selector: 'app-single-file-upload',
  standalone: true,
  providers:[ImageService],
  imports: [RouterOutlet,MatIconModule,MatProgressSpinnerModule, MatButtonModule,MatDividerModule, CommonModule, ReactiveFormsModule],
  templateUrl: './single-file-upload.component.html',
  styleUrl: './single-file-upload.component.scss'
})
export class SingleFileUploadComponent {
 
  selectedFile: any;
  loading = false;
  constructor(private sanitizer: DomSanitizer,private store:LocalStorage, private imageService: ImageService){}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.loading = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res:any) => {
          let user = this.store.getUserSettings();
          let objectURL = 'data:image/png;base64,' + res.photo;
          user.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          user.image = user.image.changingThisBreaksApplicationSecurity
          this.store.setSettings(user)
          this.onSuccess();
          this.loading = false;

        },
        (err:any) => {
          console.log(err)
          this.loading = false;
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }
}
