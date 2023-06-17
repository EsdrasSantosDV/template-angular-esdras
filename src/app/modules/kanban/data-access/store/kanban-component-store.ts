import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { concatMap, Observable, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ICreateListPayload } from '../request/icreate-list-payload';
import { ItemService } from '../services/item.service';
import { ICreateItemPayload } from '../request/icreate-item-payload';
import { IUpdateOrderItemPayload } from '../request/iupdate-order-item.payload';
import { Item } from '../models/item';
import { AlertService } from '../../../../shared/modules/alert/services/alert.service';

export interface KanbanState {
  lists: List[];
  loading: boolean;
}

export const initialState: KanbanState = {
  loading: false,
  lists: [],
};

@Injectable()
export class KanbanComponentStore extends ComponentStore<KanbanState> {
  constructor(
    private readonly listService: ListService,
    private readonly itemService: ItemService,
    private readonly alertService: AlertService
  ) {
    super(initialState);
  }

  readonly lists$ = this.select((state) => state.lists);

  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loading
  );

  readonly updaterItemAddList = this.updater<KanbanState, Item>(
    (state, newItem) => {
      const listId = newItem.listId;
      const updatedLists = state.lists.map((list) => {
        if (list.id === listId) {
          const updatedItems = [...list.items, newItem];
          if (updatedItems !== list.items) {
            return {
              ...list,
              items: updatedItems,
            };
          }
        }
        return list;
      });
      if (updatedLists !== state.lists) {
        return {
          ...state,
          lists: updatedLists,
          loading: false,
        };
      }
      return state;
    }
  );

  readonly vm$ = this.select(this.lists$, this.loading$, (lists, loading) => ({
    lists,
    loading,
  }));

  getAllList = this.effect((void$: Observable<void>) =>
    void$.pipe(
      switchMap(
        () => (
          this.patchState({ loading: true }),
          this.listService.getAllList().pipe(
            tapResponse(
              (result) => {
                this.patchState({
                  lists: result,
                  loading: false,
                });
              },
              (error: HttpErrorResponse) => this.handleError(error)
            )
          )
        )
      )
    )
  );

  addList = this.effect((ICreateListPayload$: Observable<ICreateListPayload>) =>
    ICreateListPayload$.pipe(
      switchMap(
        (ICreateListPayload) => (
          this.patchState({ loading: true }),
          this.listService.addList(ICreateListPayload).pipe(
            tapResponse(
              (newList) => {
                this.patchState((state) => ({
                  ...state,
                  lists: [...state.lists, newList],
                  loading: false,
                }));
              },
              (error: HttpErrorResponse) => this.handleError(error)
            )
          )
        )
      )
    )
  );

  addItem = this.effect((ICreateItemPayload$: Observable<ICreateItemPayload>) =>
    ICreateItemPayload$.pipe(
      switchMap(
        (ICreateItemPayload) => (
          this.patchState({ loading: true }),
          this.itemService.addItem(ICreateItemPayload).pipe(
            tapResponse(
              (newItem) => {
                this.updaterItemAddList(newItem);
              },
              (error: HttpErrorResponse) => this.handleError(error)
            )
          )
        )
      )
    )
  );

  updatedItemOrder = this.effect(
    (IUpdateOrderItemPayload$: Observable<IUpdateOrderItemPayload>) =>
      IUpdateOrderItemPayload$.pipe(
        concatMap(
          (IUpdateOrderItemPayload) => (
            this.patchState({ loading: true }),
            this.itemService.updatedItemOrder(IUpdateOrderItemPayload).pipe(
              tapResponse(
                (newItem) => {
                  this.patchState((state) => ({
                    ...state,
                    loading: false,
                  }));
                },
                (error: HttpErrorResponse) => this.handleError(error)
              )
            )
          )
        )
      )
  );

  handleError(error: HttpErrorResponse) {
    this.patchState((state) => ({
      ...state,
      loading: false,
    }));
    this.alertService.warning(error.error.message);
  }
}
