import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Item} from "../../data-access/models/item";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardItemComponent {
  @Input()
  item:Item | null;

  constructor() {
    this.item=null;
  }




}
