import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PurchaseOrder } from '../../models/purchase-order.model';
import { Person } from '../../models/person.model';

@Component({
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
}) export class StockComponent implements OnInit, OnDestroy {
    private getProductIdSub: Subscription;
    private nullProduct: Product = new Product(null, null, null, null, null, null, null, null, null, null);
    private product: Product = this.nullProduct;
    private quantityTypeOptions: String[] = [];
    private stockForm: FormGroup;
    private quantityTypeSub: Subscription;
    private costPriceSuffix: String;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductService,
        private formBuilder: FormBuilder
    ) {
        this.initializeForm();
    }


    ngOnInit() {
        this.getProductIdSub = this.route.paramMap.switchMap((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                return this.productService.getProductById(+paramMap.get('id'));
            } else {
                this.router.navigate(['/404']);
            }
        }).subscribe((product: Product) => {
            this.product = product;
            if (this.product.unitsPerCarton) {
                this.quantityTypeOptions = ['Unit', 'Carton'];
            } else {
                this.quantityTypeOptions = ['Unit'];
            }
            this.initializeForm();
        });
    }
    initializeForm() {
        this.stockForm = this.formBuilder.group({
            name: [{ value: this.product.name, disabled: true }],
            quantity: [null,[Validators.required]],
            quantityType: this.product.id?'Unit':null,
            costPrice: [this.product.cpPerUnit, [Validators.required]],
            purchaseDate: [null, [Validators.required]]
        });
        this.quantityTypeSub = this.stockForm.get('quantityType').valueChanges.subscribe(data => {
            if (data) {
                this.costPriceSuffix = "per " + data;
                const quantity = this.stockForm.get('quantity').value;
                const costPrice = this.stockForm.get('costPrice').value;
                if (data === 'Unit') {

                    if (quantity) {
                        this.stockForm.get('quantity').setValue(quantity * (+this.product.unitsPerCarton));
                    }
                    if (costPrice) {
                        this.stockForm.get('costPrice').setValue(costPrice / (+this.product.unitsPerCarton));
                    }
                } else if (data === 'Carton') {
                    if (quantity) {
                        this.stockForm.get('quantity').setValue(quantity / (+this.product.unitsPerCarton));
                    }
                    if (costPrice) {
                        this.stockForm.get('costPrice').setValue(costPrice * (+this.product.unitsPerCarton));
                    }
                }

            }
        });
    }

    ngOnDestroy() {
        this.getProductIdSub.unsubscribe();
    }
    goBack() {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
    submitForm() {
        let quantity = this.stockForm.get('quantity').value;
        let costPrice = this.stockForm.get('costPrice').value;
        const quantityType = this.stockForm.get('quantityType').value;
        if(quantityType === 'Carton') {
            quantity = quantity*(+this.product.unitsPerCarton);
            costPrice = costPrice/(+this.product.unitsPerCarton);
        }
        const orderDate = this.stockForm.get('purchaseDate').value;
        let purchaseOrder: PurchaseOrder = new PurchaseOrder(null, this.product, 
        new Person(1, null, null, null, null, null, true, true, null, null), orderDate, quantity, costPrice, null, 
        costPrice, 'added by myself');
        console.log(purchaseOrder);
    }


}