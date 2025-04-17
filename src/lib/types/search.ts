export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    storage?: string;
    countInStock: number;
}