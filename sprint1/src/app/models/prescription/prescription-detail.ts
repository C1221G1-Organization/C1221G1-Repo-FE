export interface PrescriptionDetail {
  prescriptionId?: string;
  prescriptionName?: string;
  prescriptionSymptom?: string;
  prescriptionTargetUser?: string;
  prescriptionNote?: string;
  prescriptionNumberOfDays?: string;
  medicinePrescriptionTimes?: number;
  medicinePrescriptionNumberPerTime?: number;
  totalQuantityMedicine?: number;
}
