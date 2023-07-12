import {
  ChangeDetectionStrategy,
  Component,
  effect,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../../data-access/models/item';
import { TranslocoModule } from '@ngneat/transloco';
import { MaterialModule } from '../../../../shared/modules/material/material.module';
import { Form, ReactiveFormsModule } from '@angular/forms';
import { createItemForm, itemForm } from '../../utils/forms/formItem.form';

@Component({
  selector: 'app-dialog-edit-item',
  standalone: true,
  imports: [CommonModule, TranslocoModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './dialog-edit-item.component.html',
  styleUrls: ['./dialog-edit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditItemComponent {
  readonly form = createItemForm(this.data.item);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: {
      item: Item;
    },
    private dialogRef: MatDialogRef<DialogEditItemComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }

  formSubmit() {}
}
