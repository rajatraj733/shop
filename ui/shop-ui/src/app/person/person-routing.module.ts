import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {PersonComponent} from './person.component';
import {AddPersonComponent} from './add/add.component';
const product_routes: Routes = [
    {path: '', component: PersonComponent, children: [
        {path: 'add', component: AddPersonComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(product_routes)],
    exports: [RouterModule]
}) export class PersonRoutingModule {}
