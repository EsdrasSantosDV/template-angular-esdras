import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { MatExpansionPanel } from '@angular/material/expansion';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-generic-expansion-input',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generic-expansion-input.component.html',
  styleUrls: ['./generic-expansion-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericExpansionInputComponent {
  @Output()
  inputCreated = new EventEmitter<string>();

  @Input()
  labelProperty?: string;

  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel | null;

  formInput = this.fb.group({
    inputGeneric: this.fb.control<string>('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {
    this.expansionPanel = null;
  }

  addInput() {
    if (this.formInput.valid) {
      this.expansionPanel?.close();
      this.inputCreated.emit(
        this.formInput.controls['inputGeneric'].value ?? ''
      );
      this.formInput.reset();
    }
  }
}
