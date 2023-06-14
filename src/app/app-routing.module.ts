import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'kanban'
  },
  {
    path:'kanban',
    loadChildren:() =>
    import('./modules/kanban/shell/shell-kanban.module').then((m)=>m.ShellKanbanModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
