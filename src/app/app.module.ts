import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { UserRegisterComponent } from './pages/user-register/user-register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { MasterPageModule } from './pages/master-page/master-page.module';
import { DatatableComponent } from './shared/datatable/datatable.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmployeeModalComponent } from './components/employee-modal/employee-modal.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersModalComponent } from './components/orders-modal/orders-modal.component';
import { FormModalComponent } from './components/form-modal/form-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    UserRegisterComponent,
    ForgotPasswordComponent,
    RecoveryPasswordComponent,
    LoaderComponent,
    MasterPageComponent,
    DatatableComponent,
    EmployeeModalComponent,
    OrdersComponent,
    OrdersModalComponent,
    FormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MasterPageModule,
    FormsModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
