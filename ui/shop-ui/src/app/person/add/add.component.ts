import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Person} from "../../models/person.model";

@Component({
    selector: "app-add-product",
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
}) export class AddPersonComponent implements  OnInit, OnDestroy{
  private nullPerson: Person = new Person(null, null, null, null, null, null, null, null, null, null);
  private person: Person = this.nullPerson;
  constructor(
    private formBuilder: FormBuilder,
    private personSevice: PersonService
  ){
  }

  ngOnDestroy() {

  }
  ngOnInit() {

  }
  initializeForm() {
      this.formBuilder.group({
        name: [this.person.name, [Validators.required]],
        address: [this.person.address,[Validators.maxLength(1000)]],
        mobileNo: [this.person.mobileNo, [Validators.required]],
        identificationType: [this.person.identificationType],

      });
  }
  submitForm() {

  }


}
