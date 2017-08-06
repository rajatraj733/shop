import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {Product} from '../models/product.model';
import {Person} from "../models/person.model";
@Injectable()
export class CacheService {
    private products: Product[];
    private prouductsObservable: Observable<Product[]>;
    private persons: Person[];
    private personsObservable: Observable<Person[]>;

    constructor(
        private http: Http
    ) { }

    getAllProducts(): Observable<Product[]> {
        if(this.products) {
            return Observable.of(this.products);
        } else if (this.prouductsObservable) {
            return this.prouductsObservable;
        } else {
            this.prouductsObservable = this.http.get('/shop/product/getAll.action').map(data => {
                this.prouductsObservable = null;
                this.products = data.json();
                console.log(this.products);
                return this.products;
            });
            return this.prouductsObservable;
        }
    }
    getAllPersons(): Observable<Person[]> {
      if(this.persons) {
        return Observable.of(this.persons);
      } else if (this.personsObservable) {
        return this.personsObservable;
      } else {
        this.personsObservable = this.http.get('/shop/person/getAll.action').map(data  => {
          this.personsObservable = null;
          this.persons = data.json();
          console.log(this.persons);
          return this.persons;
        });
        return this.personsObservable;
      }
    }
    clearProductsCache() {
        this.products = null;
    }
    clearPersonsCache() {
      this.persons = null;
    }


}
