import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from '@angular/http';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {NavigationComponent} from '../navigation/navigation.component';
import {ProductService} from '../services/product.service';
import {CacheService} from '../services/cache.service';
import {PersonService} from "../services/person.service";
import {PurchaseOrderService} from "../services/purchase-order.service";
import {ProductComponent} from "../product/product.component";
import {AddProductComponent} from "../product/add/add.component";
import {StockComponent} from "../product/stock/stock.component";
import {PersonComponent} from "../person/person.component";
import {AddPersonComponent} from "../person/add/add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule

  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
    ProductComponent,
    AddProductComponent,
    StockComponent,
    PersonComponent,
    AddPersonComponent
  ],
  providers: [
    ProductService,
    CacheService,
    PersonService,
    PurchaseOrderService
  ]
})
export class HomeModule { }
