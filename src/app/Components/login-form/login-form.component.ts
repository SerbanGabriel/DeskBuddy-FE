import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ 
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  showRegister:boolean = false;
  passwordDoNotMatchError = false;
  isUserLoggedIn = false;

  ngOnInit(): void {
    
  }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('',Validators.required),
  });

  registerForm = new FormGroup({
    email: new FormControl('',Validators.email),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  });

  //get userName
  onSubmit(): void {
   if(this.loginForm.valid){
    this.isUserLoggedIn = true
   }
  }

  showRegisterForm(){
    this.showRegister = !this.showRegister
  }
  
  register(){
    if(this.registerForm.value.password !== this.registerForm.value.confirmPassword){
      this.passwordDoNotMatchError = true;
      return
    }
    this.isUserLoggedIn = true
    this.passwordDoNotMatchError = false;
  }
}
