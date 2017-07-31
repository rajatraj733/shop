import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from '@angular/http';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {ProductModule} from '../product/product.module';
import {PersonModule} from '../person/person.module';
import {NavigationComponent} from '../navigation/navigation.component';
import {ProductService} from '../services/product.service';
import {CacheService} from '../services/cache.service';
import {PersonService} from "../services/person.service";
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ProductModule,
    PersonModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    NavigationComponent
  ],
  providers: [
    ProductService,
    CacheService,
    PersonService
  ]
})
export class HomeModule { }
