import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:() => import('./app.navigationRoutes').then(m => m.navRoutes)
    }
];
