export interface IDeliveryMethods {
    id: number;
    title: string;
    turnaround: string;
    price: string;
}

export interface IAddress {
    id?: string,
    user_id?: string,
    name: string,
    city: string,
    country: string,
    address: string,
    apartment: string,
    state?: string,
    postalCode: string;
}

export interface ICheckoutData {
    firstName: string;
    lastName: string;
    company?: string,
    phone: string;
    address: IAddress;
    deliveryMethod: IDeliveryMethods;
}