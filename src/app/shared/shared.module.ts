import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { AlertModule } from './modules/alert/alert.module';

@NgModule({
  declarations: [],
  imports: [MaterialModule, AlertModule],
  exports: [MaterialModule, AlertModule],
})
export class SharedModule {}
