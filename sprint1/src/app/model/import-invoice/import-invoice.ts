import {Supplier} from '../supplier';
import {Employee} from '../employee/employee';
import {ImportInvoiceMedicine} from './import-invoice-medicine';

export interface ImportInvoice {
  importInvoiceId: string;
  importSystemCode: number;
  paymentPrepayment: number;
  total: number;
  importInvoiceDate: string;
  importInvoiceHour: string;
  flag: boolean;
  supplier: Supplier;
  employee: Employee;
  importInvoiceMedicineList: ImportInvoiceMedicine[];
}
