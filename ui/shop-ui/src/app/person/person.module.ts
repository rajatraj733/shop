import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonRoutingModule} from './person-routing.module';
import {PersonComponent} from './person.component';
import {AddPersonComponent} from './add/add.component';

@NgModule({
    imports: [
        CommonModule,
        PersonRoutingModule
    ],
    declarations: [
        PersonComponent,
        AddPersonComponent
    ]
}) export class PersonModule { }