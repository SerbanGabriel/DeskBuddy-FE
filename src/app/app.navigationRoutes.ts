import { Route } from "@angular/router";
import { HomeComponent } from "./Components/home/home.component";
import { ContactsComponent } from "./Components/contacts/contacts.component";
import { UserDataComponent } from "./Components/user-data/user-data.component";
import { AdminComponent } from "./Components/admin/admin.component";
import { CartComponent } from "./Components/cart/cart.component";
import { SearchComponent } from "./Components/search/search.component";
import { EditComponent } from "./Components/edit/edit.component";

export const navRoutes: Route[] = [
    {path:'', component: HomeComponent},
    { path: 'contact', component: ContactsComponent },
    { path: 'myData', component: UserDataComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'edit', component: EditComponent },
    { path: 'cart', component: CartComponent },
    { path: 'search', component: SearchComponent },
]