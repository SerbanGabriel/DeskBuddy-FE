import { Route } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { ContactsComponent } from "./Components/contacts/contacts.component";
import { UserDataComponent } from "./Components/user-data/user-data.component";
import { AdminComponent } from "./Components/admin/admin.component";

export const navRoutes: Route[] = [
    {path:'', component: HomeComponent},
    { path: 'contact', component: ContactsComponent },
    { path: 'myData', component: UserDataComponent },
    { path: 'admin', component: AdminComponent },
]