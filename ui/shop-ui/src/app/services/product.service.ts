import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http} from '@angular/http'

import {Product} from '../models/product.model';
import {CacheService} from './cache.service';

@Injectable()
export class ProductService {
    constructor(
        private http: Http,
        private cacheService: CacheService
    ) { }
    public addProduct(product: Product): Observable<boolean> {
        return this.http.post('/shop/product/add.action', product).map(data => {
            const prod: Product = data.json();
            if(prod.id) {
                this.cacheService.clearProductsCache();
                return true;
            }
            else
                return false;
        }).catch(this.handleError);
    }

    public getProduct(name: string): Observable<Product[]> {
        return this.cacheService.getAllProducts().map(
            (products: Product[]) => {
                let productList: Product[] = [];
                for(let product of products) {
                    if(product.name.indexOf(name) !== -1) {
                        productList.push(product);
                    }
                }
                return productList;
            }
        );
    }
    public getProductById(id: Number): Observable<Product> {
        return this.cacheService.getAllProducts().map((products: Product[]) => {
            for(let product of products) {
                if(product.id === id) return product as Product;
            }
            return null;
        });
    }
    public updateProduct(product: Product): Observable<Product> {
        return this.http.post('/shop/product/update.action', product).map(data => {
            const product: Product = data.json();
            this.cacheService.clearProductsCache();
            console.log(product);
            return product;
        }).catch(this.handleError);
    }
    handleError(error: any): Promise<any>{
        console.error("An error occured"+error);
        return Promise.reject(error.message || error);
    }

}
