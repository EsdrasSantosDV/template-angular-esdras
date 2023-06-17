import { Injectable } from '@angular/core';
import { AlertType } from '../enum/alert.enum';
import { AlertComponent } from '../alert/alert.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    duration: 10000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };

  success(message: string): void {
    this.config.panelClass = ['custom-alert-success'];
    this.snackBar.openFromComponent(AlertComponent, {
      ...this.config,
      data: {
        message,
        type: AlertType.SUCCESS,
      },
    });
  }

  error(message: string): void {
    this.config.panelClass = ['custom-alert-error'];
    this.snackBar.openFromComponent(AlertComponent, {
      ...this.config,
      data: {
        message,
        type: AlertType.ERROR,
      },
    });
  }

  warning(message: string): void {
    this.config.panelClass = ['custom-alert-warning'];
    this.snackBar.openFromComponent(AlertComponent, {
      ...this.config,
      data: {
        message,
        type: AlertType.WARNING,
      },
    });
  }
}
