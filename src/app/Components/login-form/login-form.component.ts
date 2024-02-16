import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import AppSettings from '../AppSettings';
import { LocalService } from '../localStorage/local-storage.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {  SingleFileUploadComponent } from '../single-file-upload/single-file-upload.component';

@Injectable()
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule],
  providers: [LocalService,SingleFileUploadComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  showRegister: boolean = false;
  passwordDoNotMatchError = false;

  constructor(private sanitizer: DomSanitizer, private router: Router,  public storage:LocalService, private http: HttpClient) {

  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  //get userName
  login(): void {
    if (this.loginForm.valid) {
      this.http.post(AppSettings.API_ENDPOINT + "/login", this.loginForm.value)
        .subscribe((data:any) => {
          console.log(data.password !== this.loginForm.value.password)


          if(data.password !== this.loginForm.value.password){
            return;
          }
          if (data ) {
            let objectURL = 'data:image/png;base64,' + data.image;
            data.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            data.image = data.image.changingThisBreaksApplicationSecurity
            this.storage.setSettings(data)
          }
        })
    }
  }

  showRegisterForm() {
    this.showRegister = !this.showRegister
  }

  register() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.passwordDoNotMatchError = true;
      return
    }
    delete this.registerForm.value.confirmPassword
    this.http.post(AppSettings.API_ENDPOINT + "/register", this.registerForm.value)
      .subscribe()
  }

  logOut(){
    this.storage.cleanAll()
  }

  goToMyDataPage(){
    this.router.navigate(["/myData"]);
  }
}
