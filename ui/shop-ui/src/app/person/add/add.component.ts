import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Person} from "../../models/person.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "app-add-product",
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
}) export class AddPersonComponent implements  OnInit, OnDestroy{
  private nullPerson: Person = new Person(null, null, null, null, null, null, null, null, null, null);
  private person: Person = this.nullPerson;
  private personForm: FormGroup;
  private title: String = 'Add Person';
  private message: String = '';
  private formErrors = {
    name: '',
    address: '',
    mobileNo: '',
    identificationType: '',
    identificationNumber: '',
    supplierCustomer: '',
    comment: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private personSevice: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }

  ngOnDestroy() {

  }
  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
      this.personForm = this.formBuilder.group({
        name: [this.person.name, [Validators.required]],
        address: [this.person.address,[Validators.maxLength(1000)]],
        mobileNo: [this.person.mobileNo, [Validators.required]],
        identificationType: [this.person.identificationType],
        identificationNumber: [this.person.identificationNumber],
        isSupplier: [this.person.isSupplier],
        isCustomer: [this.person.isCustomer],
        comment: [this.person.comment]
      });
  }
  submitForm() {

  }
  goBack() {
      this.router.navigate(['../'], {relativeTo: this.route});
  }

}
