import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardGateComponent } from './gatepass/dashboard-gate/dashboard-gate.component';
import { UsersComponent } from './gatepass/users/users.component';
import { GeneratepassComponent } from './gatepass/generatepass/generatepass.component';
import { ViewpassComponent } from './gatepass/viewpass/viewpass.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboardPass',
    pathMatch: 'full'
  },
  {
    path: 'dashboardPass',
    component: DashboardGateComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'generatepass',
    component: GeneratepassComponent
  },
  {
    path: 'viewpass/:id',
    component: ViewpassComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
