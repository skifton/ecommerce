export interface IMultiSelect {
  value: string;
  label: string;
}

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  image: string;
  category: string;
  count: number;
  price: number;
  size: IMultiSelect[];
  color: IMultiSelect[];
  sex: string;
  createdAt: string;
}

export interface ICartProduct {
  id?: string;
  session_id?: string;
  product_id?: string;
  name?: string;
  price?: number;
  category?: string;
  image?: string;
  color?: IMultiSelect;
  size?: IMultiSelect;
  quantity: number;
}
