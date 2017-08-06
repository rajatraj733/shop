import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product.model';
import {PurchaseOrder, PurchaseOrder_PK} from '../../models/purchase-order.model';
import {Person} from '../../models/person.model';
import {PersonService} from "../../services/person.service";
import {PurchaseOrderService} from "../../services/purchase-order.service";

@Component({
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {
  private getProductIdSub: Subscription;
  private formValueChangesSub: Subscription;
  private nullProduct: Product = new Product(null, null, null, null, null, null, null, null, null, null);
  private product: Product = this.nullProduct;
  private quantityTypeOptions: String[] = [];
  private stockForm: FormGroup;
  private quantityTypeSub: Subscription;
  private costPriceSuffix: String;
  private supplier: Person;
  private message: String;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private personService: PersonService,
              private purchaseOrderService: PurchaseOrderService) {
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
    this.personService.getPersonById(1).subscribe((person: Person) => {
      if (person !== null)
        this.supplier = person;
      else {
        alert("Person with ID 1 could not be found");
        this.router.navigate(['/404']);
      }
    });
  }

  initializeForm() {
    this.stockForm = this.formBuilder.group({
      name: [{value: this.product.name, disabled: true}],
      quantity: [null, [Validators.required]],
      quantityType: this.product.id ? 'Unit' : null,
      costPrice: [this.product.cpPerUnit, [Validators.required]],
      purchaseDate: [null, [Validators.required]]
    });
    this.formValueChangesSub = this.stockForm.valueChanges.subscribe(data => {
      // console.log(data);
      this.message = null;
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
    this.formValueChangesSub.unsubscribe();
  }

  goBack() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  submitForm() {
    if(!this.supplier) {
      alert('Can\'t add stocks now');
      return;
    }
    let quantity = this.stockForm.get('quantity').value;
    let costPrice = this.stockForm.get('costPrice').value;
    const quantityType = this.stockForm.get('quantityType').value;
    if (quantityType === 'Carton') {
      quantity = quantity * (+this.product.unitsPerCarton);
      costPrice = costPrice / (+this.product.unitsPerCarton);
    }
    const orderDate = this.stockForm.get('purchaseDate').value;
    let purchaseOrder: PurchaseOrder = new PurchaseOrder(new PurchaseOrder_PK(null, this.product, this.supplier), orderDate, quantity, costPrice, null,
      costPrice, 'added by myself');
    console.log(purchaseOrder);
    this.purchaseOrderService.addPurchaseOrder(new Array(purchaseOrder)).subscribe((purchaseOrders: PurchaseOrder[]) => {
      if(purchaseOrders) {
        this.message = "Stock has been added successfully!";
        this.initializeForm();
      }

    });
  }


}
