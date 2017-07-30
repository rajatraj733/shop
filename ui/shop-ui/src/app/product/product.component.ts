import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';

@Component({
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
}) export class ProductComponent implements OnInit, OnDestroy{
    twoScreen: boolean = true;
    private urlEventChangeSub: Subscription;
    private resultProducts: Product[];
    private resultStatus: String = "No Result";
    private selectedProductId: Number = null;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService

    ) {
        let url = router.url;
        this.changeTwoScreenValue(url);
    }

    ngOnInit() {
        this.urlEventChangeSub = this.router.events.subscribe(data =>{
            // console.log(this.route);
            if(data instanceof NavigationEnd) {
                //console.log(data);
                this.changeTwoScreenValue(data.url);
            }
        });
        
    }
    ngOnDestroy() {
        this.urlEventChangeSub.unsubscribe();
    }
    changeTwoScreenValue(url: String) {
        
        if(url.endsWith('/home/product')) {
            this.selectedProductId = null;
            this.twoScreen = false;
        } else {
            this.twoScreen = true;
        }
    }
    searchProduct(formValue: any) {
        console.log(formValue);
        this.resultStatus='Searching';
        this.productService.getProduct(formValue.name).subscribe((products: Product[]) => {
            this.resultProducts = products;
            if(this.resultProducts.length === 0) {
                this.resultStatus = 'No Products Found';
            } else {
                this.resultStatus ='';
            }
            
        })
    }
    editProduct(productId: Number) {
        this.selectedProductId = productId;
        this.router.navigate(['edit', productId], {relativeTo: this.route});
    }
    addStock(productId: Number) {
        this.selectedProductId = productId;
        this.router.navigate(['addstock', productId], {relativeTo: this.route});
    }


}