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
import { SingleFileUploadComponent } from '../single-file-upload/single-file-upload.component';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NotificationService } from '../notification/notification.service';

@Injectable()
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule, MatSnackBarModule,
    MatDividerModule, MatFormFieldModule,
    MatCardModule,
    MatIcon, MatSelectModule,
    HttpClientModule,

    ReactiveFormsModule],
  providers: [LocalService, SingleFileUploadComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  showRegister: boolean = false;
  passwordDoNotMatchError = false;

  constructor(private notificationService: NotificationService, private store: LocalService, private sanitizer: DomSanitizer, private router: Router, public storage: LocalService, private http: HttpClient) {

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
      this.http.post(AppSettings.API_ENDPOINT + "/login/" + this.loginForm.value.email, this.loginForm.value)
        .subscribe({
          next: (data: any) => {
            if (data.password !== this.loginForm.value.password) {
              this.notificationService.error("Username or Passwrod incorect!")
              return;
            }
            if (data) {
              let objectURL = 'data:image/png;base64,' + data.image;
              data.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              data.image = data.image.changingThisBreaksApplicationSecurity
              this.storage.setSettings(data)
              this.router.navigate([""])
            }
          },
          error: () => {
            this.notificationService.error("Username or Passwrod incorect!")
          }
        })
    } else {
      this.notificationService.error("Account Not Found!")
      return;
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
      .subscribe((res) => {
        this.store.setSettings(res)
        this.showRegister = false;
      })
  }

  logOut() {
    this.storage.cleanAll()
    let data = {
      id: 1
    }
    this.store.setSettings(data);
    this.router.navigate([""])

  }

  goToMyDataPage() {
   
    this.router.navigate(["/myData"]);
  }

  goTocart() {
    this.router.navigate(["/cart"]);

  }

  deleteAccount() {
    this.http.delete(AppSettings.API_ENDPOINT + "/deleteAccount/" + this.store.getUserSettings().id)
      .subscribe((res) => {
        this.storage.cleanAll()
      })
  }
}
