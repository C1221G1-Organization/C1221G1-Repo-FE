import {Medicine} from "../model/medicine";

export interface MedicineStorageDto {
  readonly medicineStorageDtoId: number,
  medicine: Medicine,
  quantity: number
}
