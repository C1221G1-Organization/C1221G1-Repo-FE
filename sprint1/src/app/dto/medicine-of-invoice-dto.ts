import {Medicine} from "../model/medicine";

export interface MedicineOfInvoiceDto {
  medicine: Medicine
  invoiceMedicineQuantity: number
}
