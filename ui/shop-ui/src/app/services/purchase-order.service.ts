

import {Injectable} from "@angular/core";
import {PurchaseOrder} from "../models/purchase-order.model";
import {Http} from "@angular/http";

@Injectable()
export class PurchaseOrderService {

  constructor(private http: Http){}

  public addPurchaseOrder(purchaseOrders: PurchaseOrder[]) {
    return this.http.post('/shop/purchase-order/add.action', purchaseOrders).map((data) => {
      const purchaseOrders: PurchaseOrder[] = data.json();
      return true;
    }).catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }

}
