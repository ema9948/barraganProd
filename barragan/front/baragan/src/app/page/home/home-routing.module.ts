import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NuevoComponent } from './nuevo.component';
import { EditComponent } from './edit.component';
import { HistorialComponent } from './historial.component';

export const home_routes: Routes = [
  { path: 'home', component: NuevoComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
