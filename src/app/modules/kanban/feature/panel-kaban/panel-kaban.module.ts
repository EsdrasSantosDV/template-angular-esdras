import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import(
            './kaban-panel/kaban-panel.component'
            ).then((m) => m.KabanPanelComponent),
      },
    ]),
  ],

})
export class PanelKabanModule { }
