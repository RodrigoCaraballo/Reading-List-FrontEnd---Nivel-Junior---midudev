import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', title: 'Books Library', component: LayoutComponent},
      {path: '**', redirectTo: ''}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class LayoutRoutingModule { }
