import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, shareReplay} from "rxjs";
import {List} from "../models/list";
import {ICreateListPayload} from "../request/icreate-list-payload";
import {Item} from "../models/item";
import {ICreateItemPayload} from "../request/icreate-item-payload";
import {IUpdateOrderItemPayload} from "../request/iupdate-order-item.payload";
import {environment} from "../../../../../environments/environment.development";
import {DataGenericServiceService} from "../../../../shared/modules/http-module/data-generic-service.service";


@Injectable({
  providedIn: 'root',
})
export class ItemService{

  constructor(private readonly data: DataGenericServiceService) {}

  urlService = 'item';




  addItem(payload:ICreateItemPayload):Observable<Item>{
    return this.data.add<Item,ICreateItemPayload>(this.urlService,payload);
  }


  updatedItemOrder(
    payload:IUpdateOrderItemPayload
  ):Observable<Item>{
    return this.data.patch<Item,IUpdateOrderItemPayload>(this.urlService+`/change-order/${payload.id}`,payload);
  }










}
