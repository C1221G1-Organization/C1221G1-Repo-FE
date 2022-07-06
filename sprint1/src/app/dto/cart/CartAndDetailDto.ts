import {CustomerDtoForCart} from "./CustomerDtoForCart";
import {CartDetailDto} from "./CartDetailDto";
import {Discount} from "../../model/cart/Discount";

export interface CartAndDetailDto {
  id?: number;
  discount?: Discount;
  customer?: CustomerDtoForCart;
  cartDetail?: CartDetailDto[];
  dateCreate?: string;
}
