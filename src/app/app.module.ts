import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { EditProductComponent } from './pages/managements/products/edit-product/edit-product.component';
import { ListProductComponent } from './pages/managements/products/list-product/list-product.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { CategoriesComponent } from './pages/managements/categories/categories.component';
import { ProdtypeComponent } from './pages/managements/prodtype/prodtype.component';
import { UnitsComponent } from './pages/managements/units/units.component';
import { ListEmpComponent } from './pages/managements/employees/list-emp/list-emp.component';
import { AddEmpComponent } from './pages/managements/employees/add-emp/add-emp.component';
import { EditEmpComponent } from './pages/managements/employees/edit-emp/edit-emp.component';
import { PositionsComponent } from './pages/managements/positions/positions.component';
import { SupplierComponent } from './pages/managements/supplier/supplier.component';
import { ListCusComponent } from './pages/managements/customers/list-cus/list-cus.component';
import { EditCusComponent } from './pages/managements/customers/edit-cus/edit-cus.component';
import { AddCusComponent } from './pages/managements/customers/add-cus/add-cus.component';
import { CusViewComponent } from './pages/managements/customers/cus-view/cus-view.component';
import { EmpViewComponent } from './pages/managements/employees/emp-view/emp-view.component';

import { RepProductsComponent } from './pages/reports/rep-products/rep-products.component';
import { RepCustomersComponent } from './pages/reports/rep-customers/rep-customers.component';
import { RepSalesComponent } from './pages/reports/rep-sales/rep-sales.component';
import { RepEmpsComponent } from './pages/reports/rep-emps/rep-emps.component';
import { RepImpComponent } from './pages/reports/rep-imp/rep-imp.component';
import { RepOrderComponent } from './pages/reports/rep-order/rep-order.component';
import { RepIncomeExpanseComponent } from './pages/reports/rep-income-expanse/rep-income-expanse.component';
import { IncomeTableComponent } from './components/income-table/income-table.component';
import { ExpanseTableComponent } from './components/expanse-table/expanse-table.component';

import { PosComponent } from './pages/sales-services/pos/pos.component';
import { OnlineComponent } from './pages/sales-services/online/online.component';

import { OrderComponent } from './pages/order-import/order/order.component';
import { ImportComponent } from './pages/order-import/import/import.component';

import { DataTablesModule } from 'angular-datatables';
import { ChartsComponent } from './components/charts/charts.component';
import { AddProdmodalComponent } from './components/add-prodmodal/add-prodmodal.component';
import { ProDetlmodalComponent } from './components/pro-detlmodal/pro-detlmodal.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './pages/about/about.component';
import { SaleManageComponent } from './pages/sales-services/sale-manage/sale-manage.component';
import { OrderManageComponent } from './pages/order-import/order-manage/order-manage.component';
import { AddProductComponent } from './pages/managements/products/add-product/add-product.component';
import { ProductViewComponent } from './pages/managements/products/product-view/product-view.component';
import { AddImportComponent } from './pages/order-import/import/add-import/add-import.component';
import { AddSaleComponent } from './pages/sales-services/add-sale/add-sale.component';
import { EditSaleComponent } from './pages/sales-services/edit-sale/edit-sale.component';
import { SaleDetailComponent } from './pages/sales-services/sale-detail/sale-detail.component';
import { HttpProductDirective } from './directive/http-product.directive';
import { ChartsMonthComponent } from './components/charts-month/charts-month.component';
import { ChartsYearComponent } from './components/charts-year/charts-year.component';
import { IncomeExpanseComponent } from './pages/reports/income-expanse/income-expanse.component';
import { OrderDetailComponent } from './pages/order-import/order-detail/order-detail.component';
import { ImportDetailComponent } from './pages/order-import/import-detail/import-detail.component';


import { AuthInterceptor } from './services/auth-interceptor';
import { CachingInterceptor } from './interceptors/caching.interceptor';
import { ProductCachingInterceptor } from './interceptors/product-caching.interceptor';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { ChartsExpComponent } from './components/charts-exp/charts-exp.component';
import { ChartsExpMonthComponent } from './components/charts-exp-month/charts-exp-month.component';
import { ChartsExpYearComponent } from './components/charts-exp-year/charts-exp-year.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ChangePasswordComponent,
    EditProductComponent,
    ListProductComponent,
    EditProfileComponent,
    CategoriesComponent,
    ProdtypeComponent,
    UnitsComponent,
    ListEmpComponent,
    AddEmpComponent,
    EditEmpComponent,
    PositionsComponent,
    SupplierComponent,
    ListCusComponent,
    EditCusComponent,
    AddCusComponent,
    CusViewComponent,
    EmpViewComponent,
    RepProductsComponent,
    RepCustomersComponent,
    RepSalesComponent,
    RepEmpsComponent,
    RepImpComponent,
    RepOrderComponent,
    PosComponent,
    OnlineComponent,
    OrderComponent,
    ImportComponent,
    ChartsComponent,
    AddProdmodalComponent,
    ProDetlmodalComponent,
    AboutComponent,
    SaleManageComponent,
    OrderManageComponent,
    AddProductComponent,
    ProductViewComponent,
    AddImportComponent,
    AddSaleComponent,
    EditSaleComponent,
    SaleDetailComponent,
    HttpProductDirective,
    ChartsMonthComponent,
    ChartsYearComponent,
    IncomeExpanseComponent,
    OrderDetailComponent,
    ImportDetailComponent,
    OrderStatusPipe,
    ChartsExpComponent,
    ChartsExpMonthComponent,
    ChartsExpYearComponent,
    RepIncomeExpanseComponent,
    IncomeTableComponent,
    ExpanseTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    BrowserAnimationsModule,
    NgxUpperCaseDirectiveModule,
    NgxSpinnerModule,
    NgxPrintModule,
    NgChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProductCachingInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  exports: [
    OrderStatusPipe
  ]
})
export class AppModule { }
