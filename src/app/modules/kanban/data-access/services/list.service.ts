import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, shareReplay} from "rxjs";
import {List} from "../models/list";
import {ICreateListPayload} from "../request/icreate-list-payload";
import {DataGenericServiceService} from "../../../../shared/modules/http-module/data-generic-service.service";


@Injectable({
  providedIn: 'root',
})
export class ListService{

  constructor(private readonly data: DataGenericServiceService) {}

  urlService = 'list';


  getAllList():Observable<List[]>{
    return this.data.getAll<List[]>(this.urlService).pipe(shareReplay());
  }


  addList(payload:ICreateListPayload):Observable<List>{
    return this.data.add<List,ICreateListPayload>(this.urlService,payload);
  }



}
