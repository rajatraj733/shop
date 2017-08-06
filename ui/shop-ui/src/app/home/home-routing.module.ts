import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home.component';
import {ProductComponent} from "../product/product.component";
import {AddProductComponent} from "../product/add/add.component";
import {StockComponent} from "../product/stock/stock.component";
import {PersonComponent} from "../person/person.component";
import {AddPersonComponent} from "../person/add/add.component";

const routes: Routes = [
 {path: 'home', component: HomeComponent, children: [
   /*{path: 'product', loadChildren: '../product/product.module#ProductModule'},
   {path: 'person', loadChildren: '../person/person.module#PersonModule'}*/
   {path: 'product', component: ProductComponent, children: [
     {path: 'add', component: AddProductComponent},
     {path: 'edit/:id', component: AddProductComponent},
     {path: 'addstock/:id', component: StockComponent}
   ]},
   {path: 'person', component: PersonComponent, children: [
     {path: 'add', component: AddPersonComponent},
     {path: 'edit/:id', component: AddPersonComponent}
   ]}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
