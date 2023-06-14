import {Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {List} from "../models/list";
import {ListService} from "../services/list.service";
import {Observable, switchMap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {ICreateListPayload} from "../request/icreate-list-payload";
import {ItemService} from "../services/item.service";
import {ICreateItemPayload} from "../request/icreate-item-payload";
import {Logger} from "@ngrx/data";
import {IUpdateOrderItemPayload} from "../request/iupdate-order-item.payload";


export interface KanbanState{
  lists:List[];
}

@Injectable()
export class KanbanComponentStore extends ComponentStore<KanbanState> {

  constructor( private readonly listService: ListService,private readonly itemService: ItemService) {
    super({
      lists:[]
    });
  }

  readonly lists$ = this.select((state) => state.lists);


  readonly vm$=this.select(
    this.lists$,
    (lists)=>({
      lists
    })
  )

  getAllList=this.effect((void$:Observable<void>)=>
    void$.pipe(
      switchMap(() =>
        this.listService.getAllList().pipe(
          tapResponse(
            (result) => {
              this.patchState({
                lists: result,
              });
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  )

   addList = this.effect((ICreateListPayload$: Observable<ICreateListPayload>) =>
     ICreateListPayload$.pipe(
      switchMap((ICreateListPayload)=>
        this.listService.addList(ICreateListPayload).pipe(
          tapResponse(
            (newList)=>
            {
             this.patchState((state)=>({
               ...state,
               lists:[...state.lists,newList]
             }))
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );


  addItem = this.effect((ICreateItemPayload$: Observable<ICreateItemPayload>) =>
    ICreateItemPayload$.pipe(
      switchMap((ICreateItemPayload)=>
        this.itemService.addItem(ICreateItemPayload).pipe(
          tapResponse(
            (newItem)=>
            {
              const listId=newItem.listId;
              this.patchState((state)=>
                {
                  const {lists}=state;
                  const list=lists?.find((list)=>list.id===listId);
                  console.log(list);
                  if(list)
                  {

                      list.items = list.items ? [...list.items, newItem] : [newItem];

                  }

                  return state;
                }
              );
            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );


  updatedItemOrder = this.effect((IUpdateOrderItemPayload$: Observable<IUpdateOrderItemPayload>) =>
    IUpdateOrderItemPayload$.pipe(
      switchMap((IUpdateOrderItemPayload)=>
        this.itemService.updatedItemOrder(IUpdateOrderItemPayload).pipe(
          tapResponse(
            (newItem)=>
            {

            },
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

}
