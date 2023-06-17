import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from '../../data-access/models/list';
import { SharedModule } from '../../../../shared/shared.module';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Item } from '../../data-access/models/item';
import { CardItemComponent } from '../card-item/card-item.component';
import { GenericExpansionInputComponent } from '../generic-expansion-input/generic-expansion-input.component';
import { ICreateItemPayload } from '../../data-access/request/icreate-item-payload';
import { KanbanComponentStore } from '../../data-access/store/kanban-component-store';
import { IUpdateOrderItemPayload } from '../../data-access/request/iupdate-order-item.payload';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-list-drag-and-drop',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CardItemComponent,
    GenericExpansionInputComponent,
    TranslocoModule,
  ],
  templateUrl: './list-drag-and-drop.component.html',
  styleUrls: ['./list-drag-and-drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDragAndDropComponent {
  _List!: List;

  constructor(private kanbanComponentStore: KanbanComponentStore) {}

  get list() {
    return this._List;
  }
  @Input() set list(value: List) {
    if (value) {
      this._List = value;
    }
  }

  dropMultiList(event: CdkDragDrop<Item[]>) {
    const payload: IUpdateOrderItemPayload = {
      id: event.previousContainer.data[event.previousIndex]?.id,
      currentOrder: event.previousIndex,
      targetOrder: event.currentIndex,
      targetListId: this.list.id,
      currentListId: event.previousContainer.data[0]?.listId,
    };

    this.kanbanComponentStore.updatedItemOrder(payload);
    if (event.previousContainer == event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  drop(event: CdkDragDrop<Item[]>) {
    moveItemInArray(this.list.items, event.previousIndex, event.currentIndex);
  }

  createItem($event: string) {
    const payload: ICreateItemPayload = {
      listId: this.list.id,
      titleItem: $event,
    };

    this.kanbanComponentStore.addItem(payload);
  }
}
