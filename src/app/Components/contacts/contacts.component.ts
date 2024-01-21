import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit{
  ngOnInit(): void {
    console.log("ContactsComponent")
  }


}
