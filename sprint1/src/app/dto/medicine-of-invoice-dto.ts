import {Medicine} from "../model/medicine/medicine";


export interface MedicineOfInvoiceDto {
  medicine: Medicine
  invoiceMedicineQuantity: number
  medicineName? : string,
  quantityRefund? :number,
  medicineUnit?: string,
  totalMoney? : number,
  price?: number,
}
