import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE  */
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersPageState;
}

/** HOMEPAGE  */
export interface HomePageState {
    popularProducts: any;
    newProducts: any;
    topUsers: any;
    featuredProducts: Product[];
    newArrivals: Product[];
    topCustomers: Member[];
    promotions?: Product[];
}

/** PRODUCTS PAGE  */
export  interface ProductsPageState {
    [x: string]: any;
    // seller: Member | null;
    chosenProduct: Product | null;
    products: Product[];
    searchKeyword?: string;
    selectedCategory?: string;
}


/** ORDERS PAGE   */
export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}