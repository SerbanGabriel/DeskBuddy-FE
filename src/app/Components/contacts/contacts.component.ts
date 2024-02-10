import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ 
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers:[{
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
  
  constructor(private _formBuilder: FormBuilder){

  }

  ngOnInit(): void {
    console.log("ContactsComponent")
  }

  onSubmit(steper:any){
    if(steper.innerHTML){
      console.log(this.firstFormGroup.value)
      console.log(this.secondFormGroup.value)
    }
  }
}
