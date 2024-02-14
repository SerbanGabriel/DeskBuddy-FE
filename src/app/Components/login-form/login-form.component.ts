import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient, HttpClientModule, HttpHandler, HttpHeaders } from '@angular/common/http';
import AppSettings from '../AppSettings';
import { LocalStorage } from '../localStorage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

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
  providers: [LocalStorage],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  showRegister: boolean = false;
  passwordDoNotMatchError = false;

  constructor(  public storage:LocalStorage, private http: HttpClient, private localStorage: LocalStorage) {

  }

  ngOnInit(): void {
    console.log()
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
          if (data) {
            data.email = data.email.split("@")[0]
            this.localStorage.setSettings(data)
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
    console.log(this.registerForm.value)
    this.http.post(AppSettings.API_ENDPOINT + "/register", this.registerForm.value)
      .subscribe()
    // this.isUserLoggedIn = true
    // this.passwordDoNotMatchError = false;
  }

  logOut(){
    this.storage.cleanAll()
  }
}
