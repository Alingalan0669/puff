export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number | null;
  flavors: string[];
  nicotineStrengths: string[];
  stock: number;
  description: string;
  image: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  flavor?: string;
  nicotine?: string;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  payment: "Cash on Delivery" | "GCash";
}
