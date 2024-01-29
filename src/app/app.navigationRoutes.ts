import { Route } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { ContactsComponent } from "./Components/contacts/contacts.component";

export const navRoutes: Route[] = [
    {path:'', component: HomeComponent},
    { path: 'contact', component: ContactsComponent }
]