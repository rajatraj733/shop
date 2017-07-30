import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';


import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {AddProductComponent} from './add/add.component';
import {StockComponent} from './stock/stock.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule
    ],
    declarations: [
        ProductComponent,
        AddProductComponent,
        StockComponent
    ]
}) export class ProductModule { }