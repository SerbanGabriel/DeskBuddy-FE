import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ 
    FormsModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {
  ngOnInit(): void {
    
  }
  loginForm = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl(''),
  });

  onSubmit(): void {
   console.log(this.loginForm.value)
  }
  
}
