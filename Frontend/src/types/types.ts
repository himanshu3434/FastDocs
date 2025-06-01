import { ChangeEvent } from "react";

export type filterHandler =
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLInputElement>;

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  categoryName: string;
  coverPhoto: string;
  photo1: string;
  photo2: string;
  photo3: string;
  createdAt: Date;
  updatedAt: Date;
}

export type productProps = {
  productDetails: IProduct;
};

export interface Iuser extends Document {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  gender: string;
  address?: string;
  mobileNumber?: number;
  pincode?: string;
  country?: string;
  state?: string;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

export interface ICartItem extends Document {
  _id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  productDetails: {
    _id: string;
    name: string;
    stock: number;
    price: number;
    categoryName: string;
    coverPhoto: string;
  };
  productTotalPrice: number;
}
export interface IOrder extends Document {
  _id: string;
  transaction_id: string;
  status: string;
  payment_mode: string;
  user_id: string;
  orderAmount: number;
  discount: number;
  shippingCharge?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IOrderAndOrderItems extends Document {
  _id: string;
  transaction_id: string;
  status: string;
  payment_mode: string;
  user_id: string;
  orderAmount: number;
  discount: number;
  shippingCharge?: number;
  fullName: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export type dataType = {
  productData: IProduct;
};

export type setCategoriesType = {
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};
