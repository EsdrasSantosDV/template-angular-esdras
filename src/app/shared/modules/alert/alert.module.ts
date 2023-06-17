import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from './services/alert.service';
import { SharedModule } from '../../shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule],
  providers: [AlertService],
  exports: [AlertComponent],
})
export class AlertModule {}
