import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        pathMatch:'full',
        redirectTo:'kanban-panel-feature'
      },
      {
        path:'kanban-panel-feature',
        loadChildren:()=>import('src/app/modules/kanban/feature/panel-kaban/panel-kaban.module').then((x)=>x.PanelKabanModule),

      }

    ])
  ]
})
export class ShellKanbanModule { }
