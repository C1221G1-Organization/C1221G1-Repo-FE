import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'templates'
  },
  {
    path        : 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule)
  },
  {
    path        : 'employee',
    loadChildren: () => import('./employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path        : 'account',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  },
  {
    path        : 'admin-chat',
    loadChildren: () => import('./admin-chat/admin-chat.module').then(module => module.AdminChatModule)
  },
  {
    path        : 'log',
    loadChildren: () => import('./log/log.module').then(module => module.LogModule)
  },
  {
    path        : 'medicine',
    loadChildren: () => import('./medicine/medicine.module').then(module => module.MedicineModule)
  },
  {
    path        : 'look-up',
    loadChildren: () => import('./look-up/look-up.module').then(module => module.LookUpModule)
  },
  {
    path        : 'cart',
    loadChildren: () => import('./cart/cart.module').then(module => module.CartModule)
  },
  {
    path        : 'prescription',
    loadChildren: () => import('./prescription/prescription.module').then(module => module.PrescriptionModule)
  },
  {
    path        : 'reports',
    loadChildren: () => import('./reports/report.module').then(module => module.ReportModule)
  },
  {
    path        : 'sales-management',
    loadChildren: () => import('./sales-management/sales-management.module').then(module => module.SalesManagementModule)
  },
  {
    path        : 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(module => module.SupplierModule)
  },
  {
    path        : 'templates',
    loadChildren: () => import('./templates/templates.module').then(module => module.TemplatesModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(module => module.PaymentModule)
  },
  {
    path: 'import-invoice-medicine',
    loadChildren: () => import('./import-invoice-medicine/import-invoice-medicine.module').then(module => module.ImportInvoiceMedicineModule)
  },
  {
    path: 'import-invoice',
    loadChildren: () => import('./import-invoice/import-invoice.module').then(module => module.ImportInvoiceModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
