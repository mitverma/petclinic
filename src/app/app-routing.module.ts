import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardGateComponent } from './gatepass/dashboard-gate/dashboard-gate.component';
import { UsersComponent } from './gatepass/users/users.component';
import { GeneratepassComponent } from './gatepass/generatepass/generatepass.component';
import { ViewpassComponent } from './gatepass/viewpass/viewpass.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'patientlist',
    loadChildren: () => import('./patientlist/patientlist.module').then( m => m.PatientlistPageModule)
  },
  {
    path: 'patientdetail',
    loadChildren: () => import('./patientdetail/patientdetail.module').then( m => m.PatientdetailPageModule)
  },
  {
    path: 'addpatient',
    loadChildren: () => import('./addpatient/addpatient.module').then( m => m.AddpatientPageModule)
  },


  // generate pass route

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
