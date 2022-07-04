import {MedicineOrigin} from './medicine-origin';
import {MedicineType} from './medicine-type';
import {MedicineUnit} from './medicine-unit';
import {MedicineConversionUnit} from './medicine-conversion-unit';

export interface MedicineDto {
  medicineId: string;
  medicineName: string;
  medicineActiveIngredients: string;
  medicineImportPrice: number;
  wholesalePrice: number;
  retailPrice: number;
  medicineDiscount: number;
  medicineWholesaleProfit: number;
  medicineRetailSaleProfit: number;
  medicineTax: number;
  medicineConversionRate: number;
  medicineManufacture: string;
  medicineUsage: string;
  medicineInstruction: string;
  medicineAgeApproved: string;
  medicineImage: string;
  medicineDescription: string;
  flag: boolean;
  medicineOriginName: string;
  medicineTypeName: string;
  medicineUnitName: string;
  medicineConversionUnitName: string;
}
