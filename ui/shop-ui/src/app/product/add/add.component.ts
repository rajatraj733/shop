import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { AppConstants } from '../../app.constants';
import {Product} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
    selector: "app-add-product",
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
}) export class AddProductComponent implements OnInit, OnDestroy {
    private mode: string;
    private constProduct: Product = new Product(null, null, null, null, null, null, null, null, null, null);
    private product: Product;
    private modeParams = {
        "add": {
            "title": "Add Product"
        },
        "edit": {
            "title": "Update Product"
        }
    };
    title = "Add Product";
    private message: String = '';
    private gstTaxRateSlabList = AppConstants.GST_TAX_RATE_SLAB_LIST;
    private addProductForm: FormGroup;
    private formValueChangedSub: Subscription;
    private getProductIdSub: Subscription;
    private formErrors = {
        name: '',
        mrp: '',
        cpPerUnit: '',
        unitsPerCarton: '',
        spPerCarton: '',
        spPerUnit: '',
        gstTaxRate: '',
        comment: ''
    }
    private validationMessages = {
        'name': {
            'required': 'Name is required',
            'maxlength': 'Max length can be 100',
        },
        'mrp': {
            'min': 'MRP should be equal to or more than 0',
            'maxlength': 'MRP can not have more than 9 digits',
            'pattern': 'Numbers only accepted'
        },
        'cpPerUnit': {
            'min': 'Cost Price should be more than or equal to 0',
            'max': 'Cost Price can not be more than 99999999.9999',
            'pattern': 'Numbers only accepted and more than 4 digits not allowed in decimal'
        },
        'unitsPerCarton': {
            'min': 'No of units should be more than or equal to 1',
            'max': 'No of units should not be more than 99999999',
            'pattern': 'Numbers only accepted'
        },
        'spPerCarton': {
            'min': 'Selling Price should be more than or equal to 0',
            'max': 'Selling Price should be less than 99999999',
            'pattern': 'Numbers only accepted and more than 4 digits not allowed in decimal'
        },
        'spPerUnit': {
            'min': 'Selling Price should be more than or equal to 0',
            'max': 'Selling Price should be less than 99999999',
            'pattern': 'Numbers only accepted and more than 4 digits not allowed in decimal'
        },
        'comment': {
            'maxlength': 'It cannot contain more than 100 characters' 
        }
    }

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.product = this.constProduct;
        this.initializeForm();
    }
    ngOnInit() {
        console.log(this.router.url);
        let url = this.router.url;
        if(url.indexOf('add')!==-1) {
            this.mode = 'add';

        } else {
            this.mode = 'edit';
            this.getProductIdSub = this.route.paramMap.switchMap((paramMap: ParamMap) => {
                if(paramMap.has('id'))
                    return this.productService.getProductById(+paramMap.get('id'))
                else this.router.navigate(['/404']);
            }).subscribe((product: Product) => {
                this.message = '';
                if(product !== null) {
                    this.product = product;
                    this.initializeForm();
                } else {
                    this.message = 'Product with this id does not exist';
                }
                
            });
        }
        this.title = this.modeParams[this.mode].title;
    }

    ngOnDestroy() {
        this.formValueChangedSub.unsubscribe();
        if(this.getProductIdSub)
            this.getProductIdSub.unsubscribe();
    }


    initializeForm() {
        // this.formBuilder.group()
        this.addProductForm = new FormGroup({
            name: new FormControl(this.product.name, [Validators.required, Validators.maxLength(100)]),
            mrp: new FormControl(this.product.mrp, [Validators.maxLength(9), Validators.min(0), Validators.pattern('^[0-9]*$')]),
            cpPerUnit: new FormControl(this.product.cpPerUnit, [Validators.min(0), Validators.max(99999999.9999), 
                Validators.pattern('^[0-9]{0,8}(([\\.])[0-9]{0,4})?$')]),
            unitsPerCarton: new FormControl(this.product.unitsPerCarton, [Validators.min(1), Validators.max(999999999),
                Validators.pattern('^[0-9]*$')]),
            spPerCarton: new FormControl(this.product.spPerCarton, [Validators.min(0), Validators.max(99999999.9999),
                Validators.pattern('^[0-9]{0,8}(([\\.])[0-9]{0,4})?$')]),
            spPerUnit: new FormControl(this.product.spPerUnit, [Validators.min(0), Validators.max(99999999.9999),
                Validators.pattern('^[0-9]{0,8}(([\\.])[0-9]{0,4})?$')]),
            gstTaxRate: new FormControl(this.product.gstTaxRate),
            comment: new FormControl(this.product.comment, Validators.maxLength(100))
        });
        this.formValueChangedSub = this.addProductForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }
    onValueChanged(data?: any) {
        this.message = '';
        for(let fieldName in this.formErrors) {
            this.formErrors[fieldName] = '';
            let control = this.addProductForm.get(fieldName);
            if(control && control.dirty && !control.valid) {
                const messages = this.validationMessages[fieldName];
                for(let error in control.errors) {
                    // console.log(control.errors[error]);
                    this.formErrors[fieldName] += messages[error] + ' ';
                }
            }
        }
    }
    submitForm() {
        console.log(this.addProductForm);
        const product: Product = this.addProductForm.value as Product;
        this.productService.addProduct(product).subscribe(data => {
            /*if(data == true) {
                this.router.navigate(['../'], {relativeTo: this.route});
            }*/
            this.message = 'Product added successfully!!';
            this.product = this.constProduct;
            this.initializeForm();

        });
    }
    goBack() {
        if(this.mode === 'add')
            this.router.navigate(['../'], {relativeTo: this.route});
        else
            this.router.navigate(['../../'], {relativeTo: this.route});

    }
    updateForm() {
        let product: Product = this.addProductForm.value as Product;
        product.id = this.product.id;
        this.productService.updateProduct(product).subscribe((data: Product) => {
          if(data) {
              this.message = "Product updated successfully!!";
              this.product = data;
              this.initializeForm();
          }  
        });
    }
}