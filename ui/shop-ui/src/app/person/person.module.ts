import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonRoutingModule} from './person-routing.module';
import {PersonComponent} from './person.component';
import {AddPersonComponent} from './add/add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PersonRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PersonComponent,
    AddPersonComponent
  ]
})
export class PersonModule {
}
