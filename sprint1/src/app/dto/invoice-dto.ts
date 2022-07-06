import {Invoice} from "../model/invoice";
import {Employee} from "../model/employee";
import {MedicineStorageDto} from "./medicine-storage-dto";
import {Customer} from "../model/customer";
import {TypeOfInvoice} from "../model/type-of-invoice";

export interface InvoiceDto {
  customer: Customer,
  employee: Employee,
  invoiceCreatedDate: string,
  invoiceId: string,
  typeOfInvoice: TypeOfInvoice,
  invoiceNote: string,
}
