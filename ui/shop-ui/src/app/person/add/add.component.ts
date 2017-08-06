import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Person} from "../../models/person.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: "app-add-product",
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
}) export class AddPersonComponent implements  OnInit, OnDestroy{

  private getPersonIdSub: Subscription;
  private formValueChangedSub: Subscription;
  private nullPerson: Person = new Person(null, null, null, null, null, null, null, null, null, null);
  private person: Person = this.nullPerson;
  private personForm: FormGroup;
  private title: String = 'Add Person';
  private message: String = '';
  private mode: string;
  private modeParams = {
    'add': {
      'title': 'Add Person'
    },
    'edit': {
      'title': 'Update Person'
    }
  };
  private formErrors = {
    name: '',
    address: '',
    mobileNo: '',
    identificationType: '',
    identificationNumber: '',
    supplierCustomer: '',
    comment: ''
  };
  private validationsMessages = {
    'name' : {
      'required' : 'Name is required',
      'maxlength': 'Name can be maximum 100 characters long'
    },
    'mobileNo': {
      'pattern' : 'Accept digits only',
      'required' : 'Mobile No. is required',
      'maxlength': 'Mobile Number can be maximum 10 digits',
      'minlength': 'Mobile Number should be of at least 10 digits'
    },
    'address' : {
      'maxlength': 'Address cannot be more than 1000 characters long'
    }

  };
  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }

  ngOnDestroy() {
    if(this.getPersonIdSub)
      this.getPersonIdSub.unsubscribe();

    this.formValueChangedSub.unsubscribe();
  }
  ngOnInit() {
    this.initializeForm();
    let url = this.router.url;
    if(url.indexOf('add') !== -1){
      this.mode = 'add';
    } else {
      this.mode = 'edit';
      this.getPersonIdSub = this.route.paramMap.switchMap((paramMap: ParamMap) => {
        if(paramMap.has('id')) {
          return this.personService.getPersonById(+paramMap.get('id'));
        } else this.router.navigate(['/404']);
      }).subscribe((person: Person) => {
        this.message = '';
        if(person !== null) {
          this.person = person;
          this.initializeForm();
        } else {
          this.message = 'Person with this id does not exist';
        }

      });
    }
    this.title = this.modeParams[this.mode].title;
  }
  initializeForm() {
      this.personForm = this.formBuilder.group({
        name: [this.person.name, [Validators.required]],
        address: [this.person.address,[Validators.maxLength(1000)]],
        mobileNo: [this.person.mobileNo, [Validators.pattern('^\\d+$'),
          Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
        identificationType: [this.person.identificationType],
        identificationNumber: [this.person.identificationNumber],
        supplier: [this.person.supplier],
        customer: [this.person.customer],
        comment: [this.person.comment]
      });
      this.formValueChangedSub = this.personForm.valueChanges.subscribe(this.onValueChanged)
  }
  onValueChanged = (data) => {
      this.message = '';
      for(let fieldName in this.formErrors) {
        this.formErrors[fieldName] = '';
        let control = this.personForm.get(fieldName);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationsMessages[fieldName];
          for(let error in control.errors) {
            if(this.formErrors[fieldName])
              this.formErrors[fieldName] += ' & '
            this.formErrors[fieldName] += messages[error];
          }
        }
      }
  }
  submitForm() {
      console.log(this.personForm.value);
      // this.personSevice.addPerson()
    const person  = this.personForm.value as Person;
    this.personService.addPerson(person).subscribe((result: Boolean) => {
      if(result) {
        this.message = 'Person Added Successfully';
        this.person = this.nullPerson;
        this.initializeForm();
      }
    })

  }
  goBack() {
      if(this.mode === 'add')
        this.router.navigate(['../'], {relativeTo: this.route});
      else this.router.navigate(['../../'], {relativeTo: this.route});
  }
  updateForm() {
      console.log(this.personForm.value);
      let person: Person = this.personForm.value as Person;
      person.id = this.person.id;
      this.personService.updatePerson(person).subscribe( (person: Person) => {
        this.message = "Updated Person Successfullly!!";
        this.person = person;
        this.initializeForm();
        }

      );

  }

}
