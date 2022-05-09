import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { PageComponent } from './components/page/page.component';
import { InicialComponent } from './components/inicial/inicial.component';

const routes: Routes = [
  { path: '', component: InicialComponent },
  { path: 'home', component: InicialComponent },
  { path: 'map-component', component: MapComponent },
  { path: 'page-component', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
