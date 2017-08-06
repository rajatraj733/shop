import {Product} from './product.model';
import {Person} from './person.model';


export class PurchaseOrder {

    constructor(
        public pk: PurchaseOrder_PK, public orderDate: Date, public quantity: Number,
        public pricePerUnit: Number, public gstTaxPerUnit: Number, public invoicePricePerUnit: Number, public comment: String
    ) { }
}
export class PurchaseOrder_PK {
  constructor(
    public id: String, public product: Product, public supplier: Person
  ) {}
}
