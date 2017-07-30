import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home.component';

const routes: Routes = [
 {path: 'home', component: HomeComponent, children: [
   {path: 'product', loadChildren: '../product/product.module#ProductModule'},
   {path: 'person', loadChildren: '../person/person.module#PersonModule'}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
