import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent }
];

export const router = RouterModule.forChild(routes);