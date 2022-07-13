import {Medicine} from "../model/medicine/medicine";


export interface MedicineOfInvoiceDto {
  medicine: Medicine,
  intoMoney?: number,
  quantityRefund?: number,
  medicineUnit?: string,
  price?: number,
  medicineName?: string,
  invoiceMedicineQuantity?: number,
  moneyOfMedicine?: number
}
