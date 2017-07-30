import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {ProductComponent} from './product.component';
import {AddProductComponent} from './add/add.component';
import {StockComponent} from './stock/stock.component';

const product_routes: Routes = [
    {path: '', component: ProductComponent, children: [
        {path: 'add', component: AddProductComponent},
        {path: 'edit/:id', component: AddProductComponent},
        {path: 'addstock/:id', component: StockComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(product_routes)],
    exports: [RouterModule]
}) export class ProductRoutingModule {}
