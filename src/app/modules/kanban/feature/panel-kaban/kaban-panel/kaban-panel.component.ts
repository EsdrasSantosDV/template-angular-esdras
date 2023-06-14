import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {KanbanComponentStore} from "../../../data-access/store/kanban-component-store";
import {CdkDropListGroup} from "@angular/cdk/drag-drop";
import {ListDragAndDropComponent} from "../../../ui/list-drag-and-drop/list-drag-and-drop.component";
import {GenericExpansionInputComponent} from "../../../ui/generic-expansion-input/generic-expansion-input.component";
import {ICreateListPayload} from "../../../data-access/request/icreate-list-payload";

@Component({
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, ListDragAndDropComponent, GenericExpansionInputComponent],
  templateUrl: './kaban-panel.component.html',
  styleUrls: ['./kaban-panel.component.scss'],
  providers:[KanbanComponentStore]
})
export class KabanPanelComponent implements OnInit{
  vm$ = this.kanbanComponentStore.vm$;

  constructor(   private kanbanComponentStore: KanbanComponentStore) {
  }

  ngOnInit(): void {
    this.kanbanComponentStore.getAllList();
  }


  createList(event:string) {
    const payload:ICreateListPayload={
      titleList:event
    }
    this.kanbanComponentStore.addList(payload);
  }
}
