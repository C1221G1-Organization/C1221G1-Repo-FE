import {Position} from "../employee/position";

export interface EditAccountEmployeeDto {
  employeeId?: string;
  employeeName?: string;
  position?: Position;
  username?: string;
  password?: string;
}
