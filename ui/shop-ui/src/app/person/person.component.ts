import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
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

  constructor(// private route: ActivatedRoute,
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

      this.twoScreen = false;
    } else {
      this.twoScreen = true;
    }

  }

  searchPersons(data) {
    console.log(data);
  }


}
