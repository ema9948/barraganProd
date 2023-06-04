import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { home_routes } from './page/home/home-routing.module';
import { LoginComponent } from './page/login/login.component';
import { authGuard } from './helpers/auth/auth.guard';
import { homeGuard } from './helpers/auth/home.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: home_routes,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
