import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AlertData, AlertType } from '../enum/alert.enum';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: AlertData,
    private readonly snackBar: MatSnackBar
  ) {}

  get typeMessageStyles(): string {
    if (this.data.type === AlertType.SUCCESS) return 'icon-success';
    if (this.data.type === AlertType.ERROR) return 'icon-error';
    if (this.data.type === AlertType.WARNING) return 'icon-warning';
    return '';
  }

  get MessageTitle(): string {
    if (this.data.type === AlertType.SUCCESS) return 'Sucesso!';
    if (this.data.type === AlertType.ERROR) return 'Error!';
    if (this.data.type === AlertType.WARNING) return 'Atenção';
    return '';
  }

  getIconType() {
    switch (this.data.type) {
      case AlertType.SUCCESS:
        return 'check';
      case AlertType.ERROR:
        return 'close';
      case AlertType.WARNING:
        return 'block';
      default:
        return 'block';
    }
  }

  closeSnackBar() {
    this.snackBar.dismiss();
  }
}
