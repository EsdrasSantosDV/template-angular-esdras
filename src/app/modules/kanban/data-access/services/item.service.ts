import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, shareReplay} from "rxjs";
import {List} from "../models/list";
import {ICreateListPayload} from "../request/icreate-list-payload";
import {Item} from "../models/item";
import {ICreateItemPayload} from "../request/icreate-item-payload";
import {IUpdateOrderItemPayload} from "../request/iupdate-order-item.payload";


@Injectable({
  providedIn: 'root',
})
export class ItemService{

  constructor(private readonly http: HttpClient) {}

  baseUrl = 'item';




  addItem(payload:ICreateItemPayload):Observable<Item>{
    return this.http.post<Item>('http://localhost:3000/'+this.baseUrl,payload);
  }


  updatedItemOrder(
    payload:IUpdateOrderItemPayload
  ):Observable<Item>{

    return this.http.patch<Item>('http://localhost:3000/'+this.baseUrl+`/change-order/${payload.id}`,payload);

  }




}
