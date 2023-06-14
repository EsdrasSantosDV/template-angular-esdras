import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, shareReplay} from "rxjs";
import {List} from "../models/list";
import {ICreateListPayload} from "../request/icreate-list-payload";


@Injectable({
  providedIn: 'root',
})
export class ListService{

  constructor(private readonly http: HttpClient) {}

  baseUrl = 'list';


  getAllList():Observable<List[]>{
    return this.http.get<List[]>('http://localhost:3000/'+this.baseUrl).pipe(shareReplay());
  }


  addList(payload:ICreateListPayload):Observable<List>{
    return this.http.post<List>('http://localhost:3000/'+this.baseUrl,payload);
  }


}
