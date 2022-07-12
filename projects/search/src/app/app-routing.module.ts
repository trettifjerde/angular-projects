import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedComponent } from './advanced/advanced.component';
import { BasicComponent } from './basic/basic.component';

const routes: Routes = [
  {path: '', component: BasicComponent},
  {path: 'images', component: BasicComponent},
  {path: 'advanced', component: AdvancedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [BasicComponent, AdvancedComponent];
