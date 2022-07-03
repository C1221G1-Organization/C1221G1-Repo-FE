import {Position} from './position';

export interface Employee {
  employeeId: string;
  employeeName?: string;
  employeeImage?: string;
  employeeAddress?: string;
  employeePhone?: string;
  employeeDateStart?: string;
  employeeNote?: string;
  position?: Position;
  flag?: boolean;
}
