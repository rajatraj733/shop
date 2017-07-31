import {Injectable} from "@angular/core";
import {Person} from "../models/person.model";
import {CacheService} from "./cache.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PersonService {
  constructor(private cacheService: CacheService,
              private http: Http) {

  }

  public addPerson(person: Person): Observable<Boolean> {
    return this.http.post('/shop/person/add.action', person).map(data => {
      const person: Person = data.json();
      if (person.id) {
        return true;
      } else {
        return false;
      }
    });

  }
  public getPerson(filterCriteria: any): Observable<Person[]> {
    return this.cacheService.getAllPersons().map((persons: Person[]) => {
      let listByNameMobile: Person[] = [];
      let listByName: Person[] = [];
      let listByMobile: Person[] = [];

      return listByNameMobile.concat(listByName).concat(listByMobile);
    })

  }

}
