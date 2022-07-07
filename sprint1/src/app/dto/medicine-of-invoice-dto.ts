import {Medicine} from "../model/medicine/medicine";


export interface MedicineOfInvoiceDto {
  medicine: Medicine
  invoiceMedicineQuantity: number
}
