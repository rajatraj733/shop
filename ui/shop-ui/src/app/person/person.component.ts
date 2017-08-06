import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Person} from "../models/person.model";
import {PersonService} from "../services/person.service";


@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {
  twoScreen: boolean = true;
  private urlEventChangeSub: Subscription;
  private resultPersons: Person[] = [];
  private resultStatus: String = "No Result";
  private selectedPersonId: Number = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService) {
    let url = router.url;
    this.changeTwoScreenValue(url);
  }

  ngOnInit() {
    this.urlEventChangeSub = this.router.events.subscribe(data => {
      // console.log(this.route);
      if (data instanceof NavigationEnd) {
        console.log(data);
        this.changeTwoScreenValue(data.url);
      }
    });
  }

  ngOnDestroy() {
    this.urlEventChangeSub.unsubscribe();
  }

  changeTwoScreenValue(url: String) {
    console.log(url.lastIndexOf('/home/person'));

    if (url.endsWith('/home/person')) {
      this.selectedPersonId = null;
      this.twoScreen = false;
    } else if(url.endsWith('/home/person/add')) {
      this.selectedPersonId = null;
      this.twoScreen = true;
    } else {
      this.twoScreen = true;
    }

  }

  searchPersons(filterCriteria) {
    this.resultStatus = 'Searching';
    this.personService.getPerson(filterCriteria).subscribe((persons: Person[]) => {
      this.resultPersons = persons;
      this.resultStatus = null;
    })
    // console.log(data);
  }
  editPerson(personId: Number) {
    this.selectedPersonId = personId;
    this.router.navigate(['edit', personId], {relativeTo: this.route});
  }


}
