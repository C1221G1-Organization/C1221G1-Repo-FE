import {Medicine} from "../module/medicine";

export interface MedicineStorageDto {
  readonly medicineStorageDtoId: number,
  medicine: Medicine,
  quantity: number
}
