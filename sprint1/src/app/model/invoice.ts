import {Customer} from "./customer";
import {Employee} from "./employee";


export interface Invoice {
  invoiceId?: string;
  customer?: Customer;
  employee?: Employee;
  invoiceNote?: string;
  invoiceCreatedDate?: string;
  invoiceCreateTime?: string;
  flag?: boolean;
}
