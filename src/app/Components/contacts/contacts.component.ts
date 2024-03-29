import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { LocalService } from '../localStorage/local-storage.service';
import { LoginFormComponent } from '../login-form/login-form.component';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ 
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers:[
    LocalService,
    LoginFormComponent,{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  }]
})
export class ContactsComponent implements OnInit{
  firstFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    fullAdress: ['', Validators.required],
    postalCode: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    issue:['', Validators.required]
  });
  completed: boolean = false;
  
  constructor(private _formBuilder: FormBuilder, private localStorage: LocalService){

  }

  ngOnInit(): void {
  }

  onSubmit(steper:any){

  }
}
