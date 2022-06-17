// Management
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListProductComponent } from './pages/managements/products/list-product/list-product.component';
import { CategoriesComponent } from './pages/managements/categories/categories.component';
import { EditProductComponent } from './pages/managements/products/edit-product/edit-product.component';
import { ProductViewComponent } from './pages/managements/products/product-view/product-view.component';
import { AddProductComponent } from './pages/managements/products/add-product/add-product.component';
import { ProdtypeComponent } from './pages/managements/prodtype/prodtype.component';
import { UnitsComponent } from './pages/managements/units/units.component';
import { ListEmpComponent } from './pages/managements/employees/list-emp/list-emp.component';
import { EditEmpComponent } from './pages/managements/employees/edit-emp/edit-emp.component';
import { AddEmpComponent } from './pages/managements/employees/add-emp/add-emp.component';
import { EmpViewComponent } from './pages/managements/employees/emp-view/emp-view.component';
import { PositionsComponent } from './pages/managements/positions/positions.component';
import { SupplierComponent } from './pages/managements/supplier/supplier.component';
import { ListCusComponent } from './pages/managements/customers/list-cus/list-cus.component';
import { EditCusComponent } from './pages/managements/customers/edit-cus/edit-cus.component';
import { AddCusComponent } from './pages/managements/customers/add-cus/add-cus.component';
import { CusViewComponent } from './pages/managements/customers/cus-view/cus-view.component';

// Report
import { RepSalesComponent } from './pages/reports/rep-sales/rep-sales.component';
import { RepCustomersComponent } from './pages/reports/rep-customers/rep-customers.component';
import { RepEmpsComponent } from './pages/reports/rep-emps/rep-emps.component';
import { RepProductsComponent } from './pages/reports/rep-products/rep-products.component';
import { RepImpComponent } from './pages/reports/rep-imp/rep-imp.component';
import { RepOrderComponent } from './pages/reports/rep-order/rep-order.component';
import { IncomeExpanseComponent } from './pages/reports/income-expanse/income-expanse.component';

// Sale service
import { PosComponent } from './pages/sales-services/pos/pos.component';
import { OnlineComponent } from './pages/sales-services/online/online.component';
import { AddSaleComponent } from './pages/sales-services/add-sale/add-sale.component';
import { EditSaleComponent } from './pages/sales-services/edit-sale/edit-sale.component';
import { SaleManageComponent } from './pages/sales-services/sale-manage/sale-manage.component';
import { SaleDetailComponent } from './pages/sales-services/sale-detail/sale-detail.component';

// Import and Order
import { OrderComponent } from './pages/order-import/order/order.component';
import { ImportComponent } from './pages/order-import/import/import.component';
import { OrderManageComponent } from './pages/order-import/order-manage/order-manage.component';
import { AddImportComponent } from './pages/order-import/import/add-import/add-import.component';
import { EditImportComponent } from './pages/order-import/import/edit-import/edit-import.component';
import { OrderDetailComponent } from './pages/order-import/order-detail/order-detail.component';

// About
import { AboutComponent } from './pages/about/about.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  
  // management
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'login', component: LoginComponent, data: { animation: 'isLeft' }},
  { path: 'register', component: RegisterComponent, data: { animation: 'isRight' } },

  { path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'product-view/:id', component: ProductViewComponent, canActivate: [AuthGuard] },

  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'categories/:id', component: CategoriesComponent, canActivate: [AuthGuard] },

  { path: 'types', component: ProdtypeComponent, canActivate: [AuthGuard] },
  { path: 'types/:id', component: ProdtypeComponent, canActivate: [AuthGuard] },

  { path: 'units', component: UnitsComponent, canActivate: [AuthGuard] },
  { path: 'unit/:id', component: UnitsComponent, canActivate: [AuthGuard] },

  { path: 'list-employees', component: ListEmpComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmpComponent, canActivate: [AuthGuard] },
  { path: 'edit-employee/:id', component: EditEmpComponent, canActivate: [AuthGuard] },
  { path: 'emp-view/:id', component: EmpViewComponent, canActivate: [AuthGuard] },
  { path: 'positions', component: PositionsComponent, canActivate: [AuthGuard] },
  { path: 'positions/:id', component: PositionsComponent, canActivate: [AuthGuard] },

  { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard] },
  { path: 'supplier/:id', component: SupplierComponent, canActivate: [AuthGuard] },

  { path: 'list-cus', component: ListCusComponent, canActivate: [AuthGuard] },
  { path: 'add-cus', component: AddCusComponent, canActivate: [AuthGuard] },
  { path: 'edit-cus/:id', component: EditCusComponent, canActivate: [AuthGuard] },
  { path: 'cus-view/:id', component: CusViewComponent, canActivate: [AuthGuard] },

  // report
  { path: 'rep-customers', component: RepCustomersComponent, canActivate: [AuthGuard] },
  { path: 'rep-emps', component: RepEmpsComponent, canActivate: [AuthGuard] },
  { path: 'rep-imp', component: RepImpComponent, canActivate: [AuthGuard] },
  { path: 'income-expanse', component: IncomeExpanseComponent, canActivate: [AuthGuard] },
  { path: 'rep-products', component: RepProductsComponent, canActivate: [AuthGuard] },
  { path: 'rep-sales', component: RepSalesComponent, canActivate: [AuthGuard] },
  { path: 'rep-order', component: RepOrderComponent, canActivate: [AuthGuard] },

  // sale service
  { path: 'pos', component: PosComponent, canActivate: [AuthGuard] },
  { path: 'online', component: OnlineComponent, canActivate: [AuthGuard] },
  { path: 'sale-manage', component: SaleManageComponent, canActivate: [AuthGuard] },
  { path: 'add-sale', component: AddSaleComponent, canActivate: [AuthGuard] },
  { path: 'edit-sale/:id', component: EditSaleComponent, canActivate: [AuthGuard] },
  { path: 'sale/:inv_no', component: SaleDetailComponent, canActivate:[AuthGuard] },

  // import and order
  { path: 'order-list', component: OrderManageComponent, canActivate:[AuthGuard] },
  { path: 'order/:order_no', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'order-detail', component: OrderDetailComponent, canActivate: [AuthGuard] },
  { path: 'import', component: ImportComponent, canActivate: [AuthGuard] },
  { path: 'add-import', component: AddImportComponent, canActivate: [AuthGuard] },
  { path: 'edit-import/:id', component: EditImportComponent, canActivate: [AuthGuard] },

  // About
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
