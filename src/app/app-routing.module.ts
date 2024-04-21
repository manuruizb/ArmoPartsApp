import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { AuthGuard } from './guards/auth.guard';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'empleados',
    component: MasterPageComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: EmployeesComponent
      }
    ], canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'pedidos',
    component: MasterPageComponent,
    children: [
      {
        outlet: 'master',
        path: '',
        component: OrdersComponent
      }
    ], canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'registro-usuario',
    component: UserRegisterComponent
  },
  {
    path: 'olvido-contrasenia',
    component: ForgotPasswordComponent
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
