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
        this.cacheService.clearPersonsCache();
        return true;
      } else {
        return false;
      }
    }).catch(this.handleError);
  }
  public updatePerson(person: Person): Observable<Person> {
    return this.http.post('/shop/person/update.action', person).map((data) => {
      const resultPerson: Person = data.json();
      this.cacheService.clearPersonsCache();
      return resultPerson;
    }).catch(this.handleError);
  }
  public getPerson(filterCriteria: any): Observable<Person[]> {
    return this.cacheService.getAllPersons().map((persons: Person[]) => {
      let listByNameMobile: Person[] = [];
      let listByName: Person[] = [];
      let listByMobile: Person[] = [];
      for(let person of persons) {
        if(person.name.indexOf(filterCriteria.name) > -1 && person.mobileNo.indexOf(filterCriteria.mobile) > -1) {
          listByNameMobile.push(person);
        } else if (person.name.indexOf(filterCriteria.name) > -1) {
          listByName.push(person);
        } else if (person.mobileNo.indexOf(filterCriteria.mobile)) {
          listByMobile.push(person);
        }

      }

      return listByNameMobile.concat(listByName).concat(listByMobile);
    });

  }

  getPersonById(personId: Number): Observable<Person> {
    return this.cacheService.getAllPersons().map((persons: Person[])=>{
      for(let person of persons) {
        if(person.id === personId) return person;
      }
      return null;
    });
  }
  handleError(error: any): Promise<any>{
    console.error("An error occured"+error);
    return Promise.reject(error.message || error);
  }
}
